export const siteConfig = {
  name: "Sainul Abid",
  url: "https://sainulabid.com",
  title: "Sainul Abid — Node.js & Full Stack Developer",
  description:
    "Sainul Abid is a Node.js and full stack developer based in Kerala, India, building backends and web applications with Node.js, TypeScript, Express, MongoDB and React.",
  jobTitle: "Node.js & Full Stack Developer",
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
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Express.js",
    "Fastify",
    "MongoDB",
    "SQL",
    "React.js",
    "Next.js",
    "REST APIs",
    "Microservices",
    "Docker",
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
