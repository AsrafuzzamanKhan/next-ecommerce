import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { items, address } = await request.json();
    if (!address || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    //calculate ammount using items
    // const amount = items.reduce(async (acc, item) => {
    //   const product = await Product.findById(item.product);
    //   return acc + product.offerPrice * item.quantity;
    // }, 0);
    // ...existing code...
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      amount += product.offerPrice * item.quantity;
    }
    await inngest.send({
      name: "order Created",
      data: {
        userId,
        items,
        address,
        amount: amount + Math.floor(amount * 0.02),
        date: Date.now(),
      },
    });
    //clear user cart
    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();
    return NextResponse.json(
      { success: true, message: "Order placed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}
