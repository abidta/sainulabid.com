import { siteConfig, sameAs } from "./site";

/**
 * Shared JSON-LD nodes.
 *
 * Every page that mentions the site owner points at the same `@id`, so search
 * engines merge the Person, WebSite, profile and project markup into one
 * entity instead of seeing several unrelated "Sainul Abid"s.
 */
export const personId = `${siteConfig.url}/#person`;
export const websiteId = `${siteConfig.url}/#website`;

/** A reference to the owner, with enough fields to stand on its own. */
export const personRef = {
  "@type": "Person",
  "@id": personId,
  name: siteConfig.name,
  url: siteConfig.url,
};

export const personNode = {
  ...personRef,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  jobTitle: siteConfig.jobTitle,
  email: `mailto:${siteConfig.email}`,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressRegion: siteConfig.location.region,
    addressCountry: siteConfig.location.country,
  },
  knowsAbout: siteConfig.skills,
  sameAs,
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": websiteId,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: { "@id": personId },
};

/** BreadcrumbList from Home down to the current page. */
export const breadcrumbNode = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map(
    (item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    }),
  ),
});

/** Wrap nodes in a single JSON-LD document. */
export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
