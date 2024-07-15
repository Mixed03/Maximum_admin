import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Design from "@/lib/models/Design";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

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
      return new NextResponse("Not enough data to create a design", {
        status: 400,
      });
    }

    const newDesign = await Design.create({
      title,
      description,
      media,
      sizes,
      colors,
      price,
      expense,
    });

    await newDesign.save();

    return NextResponse.json(newDesign, { status: 200 });
  } catch (err) {
    console.log("[designs_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const designs = await Design.find()
      .sort({ createdAt: "desc" });

    return NextResponse.json(designs, { status: 200 });
  } catch (err) {
    console.log("[designs_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
