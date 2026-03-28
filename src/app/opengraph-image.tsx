/**
 * Sitewide fallback OG image (used by any route without its own opengraph-image).
 * Generated at edge runtime — no static file needed.
 */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dalify — Organic Food";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#4a6741",
        }}
      >
        {/* Gold accent band */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            backgroundColor: "#b8963e",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#fefcf9",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          Dalify
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#e8efe6",
            letterSpacing: "1px",
          }}
        >
          Certified Organic Food · India
        </div>
      </div>
    ),
    { ...size },
  );
}
