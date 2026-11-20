import { ImageResponse } from "next/og";

export const alt = "Nikunj Homes — real estate in Faridabad, Delhi-NCR";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 90, background: "#1b1e23", color: "#f6f7f9" }}>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 10, color: "#f5c518" }}>FARIDABAD · DELHI-NCR</div>
        <div style={{ display: "flex", fontSize: 150, letterSpacing: 14, marginTop: 24, fontFamily: "serif" }}>NIKUNJ HOMES</div>
        <div style={{ display: "flex", width: 160, height: 3, background: "#f5c518", marginTop: 30 }} />
        <div style={{ display: "flex", fontSize: 34, marginTop: 34, color: "#bfc4cd" }}>Residential · Commercial · Industrial · Farm houses</div>
      </div>
    ),
    size,
  );
}
