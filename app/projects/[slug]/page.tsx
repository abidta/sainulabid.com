import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { getView } from "@/app/lib/views";
import { siteConfig, ogImageMeta } from "@/app/lib/site";
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
  if (!project) return {};

  const url = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description: project.description,
      url,
      type: "article",
      authors: [siteConfig.name],
      images: [ogImageMeta],
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.twitterHandle,
      title: project.title,
      description: project.description,
      images: [ogImageMeta.url],
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
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
