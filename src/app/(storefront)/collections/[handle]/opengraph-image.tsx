/**
 * Dynamic OG image for collection pages.
 * Renders at edge runtime with the collection title, description, and image.
 */
import { ImageResponse } from "next/og";
import { getCollectionByHandle } from "@/lib/shopify";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const { collection } = await getCollectionByHandle(handle, { first: 1 }).catch(
    () => ({ collection: null }),
  );
  return [
    {
      id: handle,
      alt: collection?.title ?? "Dalify Organic Collection",
    },
  ];
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const { collection } = await getCollectionByHandle(handle, { first: 1 }).catch(
    () => ({ collection: null }),
  );

  const title = collection?.title ?? "Organic Collection";
  const description = collection?.description
    ? collection.description.slice(0, 120)
    : "Certified organic food from Indian farms. FSSAI approved.";
  const imageUrl = collection?.image?.url ?? null;

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
        {/* Left: collection image or green fill */}
        <div
          style={{
            width: "42%",
            height: "100%",
            backgroundColor: "#4a6741",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                fontSize: 80,
                color: "#e8efe6",
                opacity: 0.4,
              }}
            >
              🌿
            </div>
          )}
          {/* Overlay gradient for text legibility on left panel */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, transparent 60%, #fefcf9 100%)",
            }}
          />
        </div>

        {/* Right: text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "56px 52px",
            gap: 18,
          }}
        >
          {/* Brand */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#4a6741",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Dalify
          </div>

          {/* Collection title */}
          <div
            style={{
              fontSize: title.length > 25 ? 44 : 54,
              fontWeight: 700,
              color: "#2c2c2c",
              lineHeight: 1.15,
              letterSpacing: "-1px",
            }}
          >
            {title}
          </div>

          {/* Description */}
          {description && (
            <div
              style={{
                fontSize: 20,
                color: "#6b6b6b",
                lineHeight: 1.5,
                marginTop: 4,
              }}
            >
              {description}
            </div>
          )}

          {/* Organic + FSSAI pill */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 16,
            }}
          >
            {["100% Organic", "FSSAI Certified", "No Additives"].map((tag) => (
              <div
                key={tag}
                style={{
                  backgroundColor: "#e8efe6",
                  borderRadius: 100,
                  paddingTop: 6,
                  paddingBottom: 6,
                  paddingLeft: 16,
                  paddingRight: 16,
                  fontSize: 15,
                  color: "#4a6741",
                  fontWeight: 500,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Top accent */}
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
        {/* Bottom accent */}
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
