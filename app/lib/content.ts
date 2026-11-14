import { allBlogs } from "contentlayer/generated";

/**
 * The blog is linked, listed in the sitemap and indexable only once at least
 * one post is published. An empty "No posts yet" page is thin content that
 * search engines would otherwise crawl and index.
 */
export const hasPublishedBlogs = allBlogs.some((post) => post.published);
