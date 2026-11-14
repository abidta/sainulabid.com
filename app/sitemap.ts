import type { MetadataRoute } from "next";
import { allBlogs, allProjects } from "contentlayer/generated";
import { siteConfig } from "./lib/site";
import { hasPublishedBlogs } from "./lib/content";

/**
 * Latest content date in a collection. lastmod must reflect real changes:
 * stamping every URL with the build time teaches search engines to ignore it.
 */
const latest = (docs: { published?: boolean; date?: string }[]) => {
  const times = docs
    .filter((d) => d.published && d.date)
    .map((d) => new Date(d.date as string).getTime());
  return times.length ? new Date(Math.max(...times)) : undefined;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const projectsUpdated = latest(allProjects);
  const blogsUpdated = latest(allBlogs);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: projectsUpdated, priority: 1 },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: projectsUpdated,
      priority: 0.8,
    },
    ...(hasPublishedBlogs
      ? [
          {
            url: `${siteConfig.url}/blogs`,
            lastModified: blogsUpdated,
            priority: 0.8,
          },
        ]
      : []),
    { url: `${siteConfig.url}/contact`, priority: 0.5 },
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
