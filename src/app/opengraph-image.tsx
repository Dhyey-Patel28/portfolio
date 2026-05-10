import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Dhyey Patel — Software Developer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f7f3ec",
          color: "#1c1917",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#78716c",
          }}
        >
          Dhyey Patel
        </div>

        <div>
          <div
            style={{
              fontSize: 104,
              lineHeight: 0.9,
              letterSpacing: "-0.075em",
              maxWidth: 960,
            }}
          >
            Software developer building useful systems.
          </div>

          <div
            style={{
              marginTop: 36,
              fontSize: 28,
              lineHeight: 1.45,
              maxWidth: 780,
              color: "#57534e",
            }}
          >
            Full-stack tools, data systems, and applied ML projects.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#78716c",
            fontSize: 22,
          }}
        >
          <div
            style={{
              width: 140,
              height: 2,
              background: "#d6d3d1",
            }}
          />
          Portfolio / Selected Work
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}