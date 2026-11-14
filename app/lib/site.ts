export const siteConfig = {
  name: "Sainul Abid",
  url: "https://sainulabid.com",
  title: "Sainul Abid — Full Stack Developer | Backend Engineer",
  description:
    "Full stack developer in Kerala, India, with 4 years of experience building Node.js and TypeScript backends, React frontends and AI-powered products.",
  jobTitle: "Full Stack Developer",
  location: { region: "Kerala", country: "India", countryCode: "IN" },
  email: "sainulabidofficial@gmail.com",
  ogImage: "/opengraph-image",
  socials: {
    github: "https://github.com/abidta",
    twitter: "https://twitter.com/sainul_abid_",
    linkedin: "https://www.linkedin.com/in/abidta/",
    npm: "https://www.npmjs.com/~sainulabid",
  },
  twitterHandle: "@sainul_abid_",
  skills: [
    "Web Application Development",
    "Backend Development",
    "Backend Architecture",
    "API Design",
    "System Design",
    "Microservices",
    "Node.js",
    "TypeScript",
    "Fastify",
    "Express.js",
    "REST APIs",
    "React.js",
    "Next.js",
    "MongoDB",
    "SQL",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "AI Applications",
    "Agentic AI",
    "Docker",
    "DevOps",
    "CI/CD",
    "AWS",
    "Google Cloud",
    "Microsoft Azure",
  ],
} as const;

/**
 * Profiles that identify the same person, for the Person schema's `sameAs`.
 * Search engines and AI assistants use these links to tie the site to one
 * entity, so every public profile belongs here.
 */
export const sameAs = Object.values(siteConfig.socials);

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
