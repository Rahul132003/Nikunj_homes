import { ImageResponse } from "next/og";

export const alt = "Nikunj Homes — real estate in Faridabad, Delhi-NCR";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 90, background: "#0f2a1f", color: "#f7f3ea" }}>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 10, color: "#c8a96a" }}>FARIDABAD · DELHI-NCR</div>
        <div style={{ display: "flex", fontSize: 150, letterSpacing: 14, marginTop: 24, fontFamily: "serif" }}>NIKUNJ HOMES</div>
        <div style={{ display: "flex", width: 160, height: 3, background: "#c8a96a", marginTop: 30 }} />
        <div style={{ display: "flex", fontSize: 34, marginTop: 34, color: "#b9c4bc" }}>Residential · Commercial · Industrial · Farm houses</div>
      </div>
    ),
    size,
  );
}
