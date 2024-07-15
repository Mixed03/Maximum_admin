// import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import { connectToDB } from "@/lib/mongoDB";
// import Product from "@/lib/models/Product";

// export const POST = async (req: NextRequest, { params }: { params: { productId: string } }) => {
//   try {
//     const { userId } = getAuth(req);

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     await connectToDB();

//     const { quantity, size } = await req.json();

//     const product = await Product.findById(params.productId);
//     if (!product) {
//       return new NextResponse("Product not found", { status: 404 });
//     }

//     const sizeIndex = product.sizes.findIndex((s: any) => s.size === size);
//     if (sizeIndex === -1) {
//       return new NextResponse("Size not found", { status: 404 });
//     }

//     product.sizes[sizeIndex].stock -= quantity;
//     product.inventory -= quantity;

//     await product.save();

//     return NextResponse.json(product, { status: 200 });
//   } catch (err) {
//     console.log("[productId_inventory_POST]", err);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };

// export const dynamic = "force-dynamic";

// app/api/products/[productId]/inventory/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";

export const POST = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { quantity, size } = await req.json();

    const product = await Product.findById(params.productId);
    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const sizeIndex = product.sizes.findIndex((s: any) => s.size === size);
    if (sizeIndex === -1) {
      return new NextResponse("Size not found", { status: 404 });
    }

    product.sizes[sizeIndex].stock -= quantity;
    product.inventory -= quantity;

    await product.save();

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log("[productId_inventory_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
