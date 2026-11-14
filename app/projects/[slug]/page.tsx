import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { getView } from "@/app/lib/views";
import { siteConfig } from "@/app/lib/site";
import { jsonLd } from "@/app/lib/json-ld";
import { breadcrumbNode, graph, personRef } from "@/app/lib/schema";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = allProjects.find(
    (project) => project.slug === params?.slug && project.published,
  );
  // Next 13 does not apply not-found.tsx metadata when notFound() is called
  // from a page, so describe the 404 here.
  if (!project) {
    return {
      title: "404: Page not found",
      robots: { index: false, follow: true },
    };
  }

  const url = `/projects/${project.slug}`;
  const title = project.seoTitle ?? project.title;
  // Social images come from ./opengraph-image.tsx and ./twitter-image.tsx,
  // which render a card per project.
  return {
    title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: project.description,
      url,
      type: "article",
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.twitterHandle,
      title,
      description: project.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find(
    (project) => project.slug === slug && project.published,
  );

  if (!project) {
    notFound();
  }

  const views = await getView("projects", slug);
  const related = relatedProjects(project.slug);

  const projectUrl = `${siteConfig.url}/projects/${project.slug}`;
  const projectSchema = graph(
    {
      "@type": "SoftwareSourceCode",
      "@id": `${projectUrl}#project`,
      name: project.title,
      description: project.description,
      url: projectUrl,
      codeRepository: project.repository
        ? `https://github.com/${project.repository}`
        : undefined,
      dateCreated: project.date
        ? new Date(project.date).toISOString()
        : undefined,
      author: personRef,
    },
    breadcrumbNode([
      { name: "Projects", path: "/projects" },
      { name: project.title, path: `/projects/${project.slug}` },
    ]),
  );

  return (
    <div className="bg-zinc-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(projectSchema) }}
      />
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <p className="not-prose mb-10 text-sm text-zinc-500">
          By{" "}
          <Link
            href="/"
            className="font-medium text-zinc-700 hover:text-zinc-900"
          >
            {siteConfig.name}
          </Link>
          {project.date ? (
            <>
              {" · Started "}
              <time dateTime={new Date(project.date).toISOString()}>
                {monthYear(project.date)}
              </time>
            </>
          ) : null}
        </p>
        <Mdx code={project.body.code} />
      </article>

      {related.length > 0 ? (
        <nav
          aria-labelledby="more-projects"
          className="px-4 pb-16 mx-auto prose prose-zinc"
        >
          <h2 id="more-projects">More projects</h2>
          <ul className="not-prose grid gap-4 p-0 list-none">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="block p-4 duration-200 border rounded-lg border-zinc-200 hover:border-zinc-400 hover:bg-white"
                >
                  <span className="block font-medium text-zinc-900">
                    {p.title}
                  </span>
                  <span className="block mt-1 text-sm text-zinc-600">
                    {p.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p>
            <Link href="/projects">All projects</Link> ·{" "}
            <Link href="/contact">Get in touch</Link>
          </p>
        </nav>
      ) : null}
    </div>
  );
}

/** "Jul 2023" — month and year are enough for when a project started. */
const monthYear = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));

/** Up to three other published projects, newest first. */
const relatedProjects = (slug: string) =>
  allProjects
    .filter((p) => p.published && p.slug !== slug)
    .sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
    )
    .slice(0, 3);
