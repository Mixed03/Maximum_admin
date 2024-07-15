import Design from "@/lib/models/Design";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { designId: string } }
) => {
  try {
    await connectToDB();

    const design = await Design.findById(params.designId);

    if (!design) {
      return new NextResponse(
        JSON.stringify({ message: "Design not found" }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(design), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[designId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { designId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const design = await Design.findById(params.designId);

    if (!design) {
      return new NextResponse(
        JSON.stringify({ message: "Design not found" }),
        { status: 404 }
      );
    }

    const {
      title,
      description,
      media,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !price || !expense) {
      return new NextResponse("Not enough data to update the design", {
        status: 400,
      });
    }

    // Update design
    const updatedDesign = await Design.findByIdAndUpdate(
      design._id,
      {
        title,
        description,
        media,
        sizes,
        colors,
        price,
        expense,
      },
      { new: true }
    );

    await updatedDesign.save();

    return NextResponse.json(updatedDesign, { status: 200 });
  } catch (err) {
    console.log("[designId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { designId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const design = await Design.findById(params.designId);

    if (!design) {
      return new NextResponse(
        JSON.stringify({ message: "Design not found" }),
        { status: 404 }
      );
    }

    await Design.findByIdAndDelete(design._id);

    return new NextResponse(JSON.stringify({ message: "Design deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.log("[designId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
