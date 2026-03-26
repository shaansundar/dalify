import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * Shopify webhook handler for on-demand cache revalidation.
 *
 * Configure in Shopify Admin → Settings → Notifications → Webhooks:
 * - Product update/create/delete → revalidates product + collection caches
 * - Collection update → revalidates collection cache
 * - Order create → revalidates cart cache
 *
 * Webhook verification via SHOPIFY_WEBHOOK_SECRET (HMAC-SHA256).
 */
export async function POST(request: NextRequest) {
  const topic = request.headers.get("x-shopify-topic");
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;

  // Verify webhook signature if secret is configured
  if (secret) {
    const hmacHeader = request.headers.get("x-shopify-hmac-sha256");
    if (!hmacHeader) {
      return NextResponse.json({ error: "Missing HMAC" }, { status: 401 });
    }

    const body = await request.text();
    const { createHmac } = await import("node:crypto");
    const computed = createHmac("sha256", secret)
      .update(body, "utf8")
      .digest("base64");

    if (computed !== hmacHeader) {
      return NextResponse.json({ error: "Invalid HMAC" }, { status: 401 });
    }
  } else {
    // Consume body even without verification
    await request.text();
  }

  // Revalidate caches based on topic
  const revalidated: string[] = [];

  if (topic?.startsWith("products/")) {
    revalidateTag("products");
    revalidateTag("collections");
    revalidateTag("product-recommendations");
    revalidated.push("products", "collections", "product-recommendations");
  }

  if (topic?.startsWith("collections/")) {
    revalidateTag("collections");
    revalidated.push("collections");
  }

  if (topic?.startsWith("orders/")) {
    revalidateTag("cart");
    revalidated.push("cart");
  }

  return NextResponse.json({
    revalidated,
    topic,
    timestamp: new Date().toISOString(),
  });
}
