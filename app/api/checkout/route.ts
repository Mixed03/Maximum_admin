import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";
import Customer from "@/lib/models/Customer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer, formData, uploadedImages } = await req.json();

    if (!cartItems || !customer || !formData) {
      return new NextResponse("Not enough data to checkout", { status: 400 });
    }

    await connectToDB();

    const orderItems = cartItems.map((cartItem: any) => ({
      product: cartItem.item._id,
      color: cartItem.color || "N/A",
      size: cartItem.size || "N/A",
      quantity: cartItem.quantity,
    }));

    const newOrder = new Order({
      customerClerkId: customer.clerkId,
      products: orderItems,
      shippingAddress: formData,
      totalAmount: cartItems.reduce((acc: number, cartItem: any) => acc + cartItem.item.price * cartItem.quantity, 0),
      image: uploadedImages, // Ensure images are included in the order
    });

    await newOrder.save();

    let customerDoc = await Customer.findOne({ clerkId: customer.clerkId });

    if (customerDoc) {
      customerDoc.orders.push(newOrder._id);
    } else {
      customerDoc = new Customer({
        ...customer,
        orders: [newOrder._id],
      });
    }

    await customerDoc.save();

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (err) {
    console.log("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
