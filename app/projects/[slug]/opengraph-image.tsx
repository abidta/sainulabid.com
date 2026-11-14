import { ImageResponse } from "next/server";
import { allProjects } from "contentlayer/generated";
import { siteConfig } from "@/app/lib/site";
import { fontOptions, loadDisplayFont } from "@/app/lib/font";

export const alt = `A project by ${siteConfig.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card for one project: its name and summary, with the site's look. */
export default function ProjectImage({ params }: { params: { slug: string } }) {
  const project = allProjects.find(
    (p) => p.slug === params.slug && p.published,
  );
  const font = loadDisplayFont();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "linear-gradient(135deg, #000000 0%, #18181b 100%)",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#71717a" }}>
        sainulabid.com / projects
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: "#fafafa",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {project?.title ?? siteConfig.name}
        </div>
        {project ? (
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              lineHeight: 1.35,
              color: "#a1a1aa",
              maxWidth: 1000,
            }}
          >
            {project.description}
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", fontSize: 28, color: "#e4e4e7" }}>
        {siteConfig.name} · {siteConfig.jobTitle}
      </div>
    </div>,
    {
      ...size,
      fonts: fontOptions(font),
    },
  );
}
