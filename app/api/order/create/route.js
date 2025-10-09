import connectDB from "@/config/db";
import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is not set in environment");
    }
    const { userId } = getAuth(request);
    if (!userId) {
      console.log("No userId found");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const { items, address } = await request.json();
    if (!address || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    //calculate ammount using items
    // const amount = items.reduce(async (acc, item) => {
    //   const product = await Product.findById(item.product);
    //   return (await acc) + product.offerPrice * item.quantity;
    // }, 0);
    // Calculate amount using items (use for...of for async)
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        console.log("Product not found:", item.product);
        return NextResponse.json(
          { success: false, message: `Product not found: ${item.product}` },
          { status: 404 }
        );
      }
      amount += product.offerPrice * item.quantity;
    }
    await inngest.send({
      name: "order/created",
      data: {
        userId,
        items,
        address,
        amount: amount + Math.floor(amount * 0.02),
        date: Date.now(),
      },
    });

    // Also create the order directly in the database as a fallback so orders
    // are persisted even if Inngest processing is delayed or not running.
    let createdOrder = null;
    try {
      createdOrder = await Order.create({
        userId,
        items,
        amount: amount + Math.floor(amount * 0.02),
        address,
        date: Date.now(),
      });
    } catch (e) {
      console.error("Failed to create Order directly:", e);
      // proceed — Inngest may still create the order when it processes the event
    }
    //clear user cart if user exists
    try {
      const user = await User.findById(userId);
      if (user) {
        user.cartItems = {};
        await user.save();
      } else {
        console.warn("User not found when trying to clear cart:", userId);
      }
    } catch (e) {
      console.error("Failed to clear user cart:", e);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        orderId: createdOrder ? String(createdOrder._id) : null,
        createdInDb: !!createdOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
