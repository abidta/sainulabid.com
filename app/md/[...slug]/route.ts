import { allBlogs, allProjects } from "contentlayer/generated";
import { siteConfig } from "@/app/lib/site";

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

/**
 * Plain-markdown mirror of a single page: /md/projects/<slug> or /md/blogs/<slug>.
 * Linked from llms.txt so an LLM can fetch one page without parsing the HTML app.
 */
export function GET(
  _request: Request,
  { params }: { params: { slug: string[] } },
) {
  const [section, slug] = params.slug ?? [];

  const collection =
    section === "projects"
      ? (allProjects as unknown as Doc[])
      : section === "blogs"
        ? (allBlogs as unknown as Doc[])
        : null;

  const doc = collection?.find((d) => d.slug === slug && d.published);

  if (!doc) {
    return new Response("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const body = [
    `# ${doc.title}`,
    "",
    `Source: ${siteConfig.url}/${section}/${doc.slug}`,
    `Author: ${siteConfig.name} (${siteConfig.url})`,
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

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
      // Plain-text mirrors of HTML pages: readable by AI crawlers, kept out of
      // the search index so they cannot compete with the canonical HTML URL.
      "X-Robots-Tag": "noindex",
    },
  });
}
