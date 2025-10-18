import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Address from "@/models/address";
import Order from "@/models/Order";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ensure Address and Product models are registered before populate
    // populate items.product first, then address for clarity
    // Address.length;
    // const orders = await Order.find({})
    //   .populate("address items.product")
    //   .sort({ date: -1 });
    Address.length;
    // 1️⃣ Fetch all orders
    const orders = await Order.find({})
      .lean()
      .populate("address items.product");
    // 2️⃣ Fetch all users with orders
    const userIds = orders.map((o) => o.userId);
    const users = await User.find({ _id: { $in: userIds } })
      .select("_id email name")
      .lean();
    // 3️⃣ Create a map: { userId -> {email, name} }
    const userMap = Object.fromEntries(
      users.map((u) => [u._id, { email: u.email, name: u.name }])
    );
    // 4️⃣ Attach email and name to each order
    const ordersWithEmails = orders.map((order) => ({
      ...order,
      email: userMap[order.userId]?.email || "No email found",
      userName: userMap[order.userId]?.name || "Unknown user",
    }));
    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
