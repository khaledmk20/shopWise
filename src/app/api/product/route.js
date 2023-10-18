import { mongooseConnect } from "@/app/lib/mongoose";
import { Product } from "@/modals/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  await mongooseConnect();

  if (id) {
    const product = await Product.findById(id);
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.error(404, "Product not found");
    }
  } else {
    const products = await Product.find().sort({ _id: -1 });
    return NextResponse.json(products);
  }
}
