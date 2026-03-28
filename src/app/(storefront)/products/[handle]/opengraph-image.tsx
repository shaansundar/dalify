/**
 * Dynamic OG image for individual product pages.
 * Generates at edge runtime using the product title and featured image from Shopify.
 */
import { ImageResponse } from "next/og";
import { getProductByHandle } from "@/lib/shopify";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle).catch(() => null);
  return [
    {
      id: handle,
      alt: product?.title ?? "Dalify Organic Product",
    },
  ];
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle).catch(() => null);

  const title = product?.title ?? "Organic Product";
  const category = product?.productType ?? "Organic Food";
  const price = product?.priceRange?.minVariantPrice?.amount;
  const currency = product?.priceRange?.minVariantPrice?.currencyCode ?? "INR";
  const imageUrl = product?.featuredImage?.url ?? null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#fefcf9",
          position: "relative",
        }}
      >
        {/* Left: product image panel */}
        <div
          style={{
            width: imageUrl ? "45%" : "0%",
            height: "100%",
            backgroundColor: "#f0ebe3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>

        {/* Right: text panel */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 56px",
            gap: 16,
          }}
        >
          {/* Brand */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#4a6741",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Dalify
          </div>

          {/* Category */}
          <div style={{ fontSize: 20, color: "#6b6b6b", fontWeight: 400 }}>
            {category}
          </div>

          {/* Product title */}
          <div
            style={{
              fontSize: title.length > 30 ? 40 : 52,
              fontWeight: 700,
              color: "#2c2c2c",
              lineHeight: 1.15,
              letterSpacing: "-1px",
            }}
          >
            {title}
          </div>

          {/* Price */}
          {price && (
            <div
              style={{
                fontSize: 32,
                fontWeight: 600,
                color: "#4a6741",
                marginTop: 8,
              }}
            >
              {currency === "INR" ? "₹" : currency}
              {parseFloat(price).toFixed(0)}
            </div>
          )}

          {/* FSSAI badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#e8efe6",
              borderRadius: 100,
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 16,
              paddingRight: 16,
              fontSize: 16,
              color: "#4a6741",
              fontWeight: 500,
              marginTop: 12,
              width: "fit-content",
            }}
          >
            <span style={{ color: "#b8963e" }}>✓</span>
            FSSAI Certified Organic
          </div>
        </div>

        {/* Green accent top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#4a6741",
          }}
        />
        {/* Gold accent bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#b8963e",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
