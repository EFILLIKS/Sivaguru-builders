import { ImageResponse } from "next/og";


export const alt = "Sivaguru Builders - Architecture, Construction & Interior Design in Tamil Nadu";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0A",
          backgroundImage: "radial-gradient(circle at 25px 25px, #1A1A1A 2%, transparent 0%)",
          backgroundSize: "50px 50px",
          padding: "80px",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar branding */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#F47920",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: "32px",
              fontWeight: "700",
              letterSpacing: "-0.5px",
              color: "#FFFFFF",
            }}
          >
            Sivaguru Builders
          </span>
        </div>

        {/* Hero Tagline & Subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "950px" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#F47920",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Architecture · Construction · Interior Design
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: "800",
              lineHeight: "1.1",
              color: "#FFFFFF",
              letterSpacing: "-1px",
            }}
          >
            Building Architectural Excellence Across Trichy & Tamil Nadu
          </div>
        </div>

        {/* Bottom Tagline & Accent Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid #27272A",
            paddingTop: "32px",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span
              style={{
                backgroundColor: "#F4792020",
                color: "#F47920",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "18px",
                fontWeight: "600",
                border: "1px solid #F4792040",
              }}
            >
              General Contractor & Architects
            </span>
            <span
              style={{
                color: "#71717A",
                fontSize: "18px",
              }}
            >
              Trichy, Tamil Nadu
            </span>
          </div>
          <div
            style={{
              color: "#F47920",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            www.sivagurubuilders.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
