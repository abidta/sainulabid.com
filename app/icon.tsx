import { ImageResponse } from "next/server";
import { displayFontName, fontOptions, loadDisplayFont } from "./lib/font";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";

export default function Icon() {
  const font = loadDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          color: "#fafafa",
          fontSize: 180,
          fontWeight: 700,
          fontFamily: font ? displayFontName : undefined,
          letterSpacing: "-0.05em",
        }}
      >
        S
      </div>
    ),
    {
      ...size,
      fonts: fontOptions(font),
    },
  );
}
