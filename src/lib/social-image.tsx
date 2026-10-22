import { ImageResponse } from "next/og";

export const socialImageSize = { width: 1200, height: 630 };
export const socialImageAlt =
  "Dhyey Patel, software engineer building production web tools.";

// Shared by opengraph-image and twitter-image so both previews stay identical.
export function renderSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f7f3ec",
          color: "#0c0a09",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#78716c",
          }}
        >
          <span>Dhyey Patel</span>
          <span style={{ letterSpacing: "0.08em", textTransform: "none" }}>
            dhyey-patel.vercel.app
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: "-0.06em",
          }}
        >
          <span>Software engineer building</span>
          <span>production web tools.</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            fontSize: 22,
            color: "#57534e",
          }}
        >
          {[
            "Web Developer · Eastern Michigan University",
            "Ex-Givaudan",
            "IEEE MLSP & ICTAI 2026",
          ].map((label) => (
            <span
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                height: 56,
                padding: "0 24px",
                border: "1px solid #d6d3d1",
                borderRadius: 999,
                background: "#fbf8f1",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    ),
    socialImageSize
  );
}
