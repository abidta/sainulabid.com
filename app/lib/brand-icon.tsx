import { ImageResponse } from "next/server";
import { displayFontName, fontOptions, loadDisplayFont } from "./font";

/**
 * The site icon: a white "S" on near-black, drawn at any square size.
 * Used by app/icon.tsx (favicon, also served at /favicon.ico) and
 * app/apple-icon.tsx (iOS home screen).
 */
export function brandIcon(px: number) {
  const font = loadDisplayFont();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#09090b",
        color: "#fafafa",
        fontSize: Math.round(px * 0.7),
        fontWeight: 700,
        fontFamily: font ? displayFontName : undefined,
        letterSpacing: "-0.05em",
      }}
    >
      S
    </div>,
    {
      width: px,
      height: px,
      fonts: fontOptions(font),
    },
  );
}
