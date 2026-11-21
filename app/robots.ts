import type { MetadataRoute } from "next";
import { siteConfig } from "./lib/site";

/**
 * AI crawlers are allowed explicitly. Some of them read and cite content
 * (ChatGPT search, Perplexity, Claude); others gather training data. Listing
 * them by name makes the intent auditable instead of relying on the wildcard.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "cohere-ai",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // One group: every crawler, with the AI crawlers named explicitly.
        userAgent: ["*", ...aiCrawlers],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
