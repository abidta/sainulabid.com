import { allBlogs, allProjects } from "contentlayer/generated";
import { siteConfig } from "../lib/site";

export const revalidate = 3600;

/**
 * llms.txt — a curated, plain-markdown index of this site for LLMs and AI
 * search engines. Spec: https://llmstxt.org
 * Full text of every page lives at /llms-full.txt, single pages at /md/<path>.
 */
export function GET() {
  const published = <T extends { published?: boolean }>(items: T[]) =>
    items.filter((item) => item.published);

  const line = (item: {
    title: string;
    description: string;
    slug: string;
    date?: string;
  }, section: string) =>
    `- [${item.title}](${siteConfig.url}/md/${section}/${item.slug}): ${item.description}`;

  const projects = published(allProjects)
    .sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
    )
    .map((p) => line(p, "projects"));

  const blogs = published(allBlogs)
    .sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
    )
    .map((p) => line(p, "blogs"));

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} is a ${siteConfig.jobTitle} based in ${siteConfig.location.locality}, ${siteConfig.location.country}, available for freelance and contract work. Core stack: ${siteConfig.skills.join(", ")}.

## Pages

- [Home](${siteConfig.url}): Overview of ${siteConfig.name} and current work.
- [Projects](${siteConfig.url}/projects): Open source projects and web applications.
- [Blog](${siteConfig.url}/blogs): Notes on Node.js, TypeScript and backend architecture.
- [Contact](${siteConfig.url}/contact): Email, GitHub and X/Twitter.

## Projects
${projects.length ? projects.join("\n") : "- (none published yet)"}

## Blog
${blogs.length ? blogs.join("\n") : "- (none published yet)"}

## Optional

- [Full text of all pages](${siteConfig.url}/llms-full.txt)
- [GitHub](${siteConfig.socials.github})
- [X / Twitter](${siteConfig.socials.twitter})
- [Email](mailto:${siteConfig.email})
`;

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
