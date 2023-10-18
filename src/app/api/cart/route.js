import { NextResponse } from "next/server";
import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "@/modals/Product";

export async function POST(req) {
  await mongooseConnect();

  const jsonBody = await req.json();
  const { ids } = jsonBody;

  return NextResponse.json(await Product.find({ _id: ids }));
}
