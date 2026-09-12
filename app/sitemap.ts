import type { MetadataRoute } from "next";
import { allBlogs, allProjects } from "contentlayer/generated";
import { siteConfig } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: new Date(), priority: 1 },
    { url: `${siteConfig.url}/projects`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteConfig.url}/blogs`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteConfig.url}/contact`, lastModified: new Date(), priority: 0.5 },
  ];

  const projects: MetadataRoute.Sitemap = allProjects
    .filter((p) => p.published)
    .map((p) => ({
      url: `${siteConfig.url}/projects/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : new Date(),
      priority: 0.7,
    }));

  const blogs: MetadataRoute.Sitemap = allBlogs
    .filter((p) => p.published)
    .map((p) => ({
      url: `${siteConfig.url}/blogs/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : new Date(),
      priority: 0.7,
    }));

  return [...staticRoutes, ...projects, ...blogs];
}
