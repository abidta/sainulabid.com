import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/server";
import { siteConfig } from "./lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const calSans = readFileSync(
  join(process.cwd(), "public/fonts/CalSans-SemiBold.ttf"),
);

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #000000 0%, #18181b 100%)",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#fafafa",
            letterSpacing: "-0.03em",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 40,
            color: "#a1a1aa",
          }}
        >
          {siteConfig.jobTitle}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 28,
            color: "#71717a",
          }}
        >
          Node.js · TypeScript · Express · MongoDB · React
        </div>
        <div
          style={{
            marginTop: 64,
            fontSize: 28,
            color: "#e4e4e7",
          }}
        >
          sainulabid.com
        </div>
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
