export const siteConfig = {
  name: "Sainul Abid",
  url: "https://sainulabid.com",
  title: "Sainul Abid — Full Stack Developer | Backend Engineer",
  description:
    "Full stack developer in Kerala, India. I build web applications end to end — Node.js and TypeScript backends, REST APIs and React frontends.",
  jobTitle: "Full Stack Developer",
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
    "Web Application Development",
    "Backend Development",
    "Backend Architecture",
    "API Design",
    "System Design",
    "Node.js",
    "TypeScript",
    "Fastify",
    "Express.js",
    "REST APIs",
    "React.js",
    "Next.js",
    "MongoDB",
    "SQL",
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
