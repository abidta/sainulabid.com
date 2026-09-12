import { allBlogs, allProjects } from "contentlayer/generated";
import { siteConfig } from "../lib/site";

export const revalidate = 3600;

type Doc = {
  title: string;
  description: string;
  slug: string;
  date?: string;
  url?: string;
  repository?: string;
  published?: boolean;
  body: { raw: string };
};

const render = (doc: Doc, section: string) =>
  [
    `# ${doc.title}`,
    "",
    `Source: ${siteConfig.url}/${section}/${doc.slug}`,
    doc.date ? `Published: ${new Date(doc.date).toISOString().slice(0, 10)}` : "",
    doc.repository ? `Repository: https://github.com/${doc.repository}` : "",
    doc.url ? `Live: ${doc.url}` : "",
    "",
    doc.description,
    "",
    doc.body.raw.trim(),
    "",
  ]
    .filter((part) => part !== "")
    .join("\n");

export function GET() {
  const projects = (allProjects as unknown as Doc[])
    .filter((p) => p.published)
    .map((p) => render(p, "projects"));

  const blogs = (allBlogs as unknown as Doc[])
    .filter((p) => p.published)
    .map((p) => render(p, "blogs"));

  const body = `# ${siteConfig.name} — full site text

> ${siteConfig.description}

${siteConfig.name} is a ${siteConfig.jobTitle} based in ${siteConfig.location.locality}, ${siteConfig.location.country}. Core stack: ${siteConfig.skills.join(", ")}.
Contact: ${siteConfig.email} · ${siteConfig.socials.github} · ${siteConfig.socials.twitter}

---

${[...projects, ...blogs].join("\n---\n\n")}`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
      // Plain-text mirrors of HTML pages: readable by AI crawlers, kept out of
      // the search index so they cannot compete with the canonical HTML URL.
      "X-Robots-Tag": "noindex",
    },
  });
}
