export const siteConfig = {
  name: "Sainul Abid",
  url: "https://sainulabid.com",
  title: "Sainul Abid — Node.js Backend Engineer & System Architect",
  description:
    "Backend engineer and system architect in Kerala, India. I design Node.js and TypeScript services, distributed systems and APIs built to scale.",
  jobTitle: "Backend Engineer & System Architect",
  location: { locality: "Kerala", country: "India" },
  email: "sainulabidofficial@gmail.com",
  ogImage: "/opengraph-image",
  socials: {
    github: "https://github.com/abidta",
    twitter: "https://twitter.com/sainul_abid_",
    website: "https://abidta.github.io",
  },
  twitterHandle: "@sainul_abid_",
  skills: [
    "Backend Architecture",
    "Distributed Systems",
    "System Design",
    "Microservices",
    "Node.js",
    "TypeScript",
    "Fastify",
    "Express.js",
    "REST APIs",
    "MongoDB",
    "SQL",
    "Docker",
    "Kubernetes",
    "React.js",
  ],
} as const;

/**
 * Route-level `openGraph` objects replace the parent's, which drops the
 * opengraph-image.tsx file convention. Spread this into every route that
 * declares its own openGraph so the generated card is never lost.
 */
export const ogImageMeta = {
  url: siteConfig.ogImage,
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.jobTitle}`,
};

export const absoluteUrl = (path: string) =>
  new URL(path, siteConfig.url).toString();
