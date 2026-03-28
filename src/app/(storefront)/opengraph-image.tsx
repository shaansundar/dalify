import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dalify — Organic Spices, Grains & Pulses";
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
          backgroundColor: "#fefcf9",
          position: "relative",
        }}
      >
        {/* Green accent band at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: "#4a6741",
          }}
        />

        {/* Gold accent band at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: "#b8963e",
          }}
        />

        {/* Background texture dots */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 80,
            width: 200,
            height: 200,
            borderRadius: "50%",
            backgroundColor: "#e8efe6",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            width: 140,
            height: 140,
            borderRadius: "50%",
            backgroundColor: "#f5f0e3",
            opacity: 0.7,
          }}
        />

        {/* Logo / Brand name */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: "#2c2c2c",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          Dalify
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: "#4a6741",
            letterSpacing: "0.5px",
            marginBottom: 40,
          }}
        >
          Organic Spices · Grains · Pulses · Instant Mixes
        </div>

        {/* Trust badges row */}
        <div
          style={{
            display: "flex",
            gap: 24,
            alignItems: "center",
          }}
        >
          {["FSSAI Certified", "Farm Fresh", "No Additives", "Free Shipping ₹499+"].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "#e8efe6",
                  borderRadius: 100,
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 20,
                  paddingRight: 20,
                  fontSize: 18,
                  color: "#4a6741",
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#b8963e", fontSize: 20 }}>✓</span>
                {badge}
              </div>
            ),
          )}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 60,
            fontSize: 20,
            color: "#6b6b6b",
            fontWeight: 400,
          }}
        >
          dalify.in
        </div>
      </div>
    ),
    { ...size },
  );
}
