import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/server";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";

const calSans = readFileSync(
  join(process.cwd(), "public/fonts/CalSans-SemiBold.ttf"),
);

export default async function Icon() {
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
          fontFamily: "Cal Sans",
          letterSpacing: "-0.05em",
        }}
      >
        S
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Cal Sans",
          data: calSans,
          style: "normal",
        },
      ],
    },
  );
}
