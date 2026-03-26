import { NextResponse, type NextRequest } from "next/server";
import { searchProducts } from "@/lib/shopify";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";

  if (query.length < 2) {
    return NextResponse.json({ products: [] });
  }

  try {
    const { products } = await searchProducts(query, 5);
    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ products: [] });
  }
}
