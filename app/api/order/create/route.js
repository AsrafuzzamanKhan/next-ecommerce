import connectDB from "@/config/db";
import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";

import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    // if (!process.env.MONGODB_URI) {
    //   console.error("MONGODB_URI is not set in environment");
    // }
    const { userId } = getAuth(request);
    if (!userId) {
      console.log("No userId found");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // find user by ID
    const user = await User.findById(userId).select("email");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    const { items, address } = await request.json();
    if (!address || !items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          email: user.email,
          message: "All fields are required",
        },
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
        email: user.email,
        items,
        address,
        amount: amount + Math.floor(amount * 0.02),
        date: Date.now(),
      },
    });

    //  create user cart
    // const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();
    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
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
