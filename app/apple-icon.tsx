import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon (iOS): the brand house mark on graphite, matching app/icon.svg. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1b1e23" }}>
        <svg width="112" height="112" viewBox="0 0 64 64" fill="none">
          <path d="M14 50V30L32 14l18 16v20" stroke="#f5c518" strokeWidth="3.4" strokeLinejoin="round" />
          <path d="M26 50V36h12v14" stroke="#f5c518" strokeWidth="3.4" />
        </svg>
      </div>
    ),
    size,
  );
}
