import { ImageResponse } from "next/server";
import { displayFontName, fontOptions, loadDisplayFont } from "./font";

/**
 * The site icon: a white "S" on near-black, drawn at any square size.
 * Used by app/apple-icon.tsx (iOS home screen). The favicon is the static
 * app/favicon.ico, rendered from this at 192px and packed with 16/32/48px
 * sizes. It is a fixed file on purpose: Google asks for a stable favicon URL,
 * and a generated icon gets a new ?hash URL every time it changes.
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
