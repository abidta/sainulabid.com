import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allBlogs } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { getView } from "@/app/lib/views";
import { siteConfig, ogImageMeta } from "@/app/lib/site";
import { jsonLd } from "@/app/lib/json-ld";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allBlogs
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = allBlogs.find((blog) => blog.slug === params?.slug);
  if (!blog) return {};

  const url = `/blogs/${blog.slug}`;
  return {
    title: blog.title,
    description: blog.description,
    alternates: { canonical: url },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url,
      type: "article",
      publishedTime: blog.date
        ? new Date(blog.date).toISOString()
        : undefined,
      authors: [siteConfig.name],
      images: [ogImageMeta],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [ogImageMeta.url],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    notFound();
  }

  const views = await getView("blogs", slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    datePublished: blog.date ? new Date(blog.date).toISOString() : undefined,
    dateModified: blog.date ? new Date(blog.date).toISOString() : undefined,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blogs/${blog.slug}`,
    },
    image: `${siteConfig.url}/opengraph-image`,
  };

  return (
    <div className="bg-zinc-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }}
      />
      <Header blog={blog} views={views} />
      <ReportView slug={blog.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={blog.body.code} />
      </article>
    </div>
  );
}
