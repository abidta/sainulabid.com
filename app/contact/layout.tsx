import type { Metadata } from "next";
import { siteConfig, ogImageMeta } from "../lib/site";
import {
  breadcrumbNode,
  graph,
  personId,
  personNode,
  websiteId,
} from "../lib/schema";
import { jsonLd } from "../lib/json-ld";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — ${siteConfig.jobTitle} based in ${siteConfig.location.region}, ${siteConfig.location.country}. Available for freelance and contract work.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `LinkedIn, email, GitHub and X/Twitter for ${siteConfig.name}.`,
    url: "/contact",
    type: "profile",
    images: [ogImageMeta],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${siteConfig.name}`,
    description: `LinkedIn, email, GitHub and X/Twitter for ${siteConfig.name}.`,
    creator: siteConfig.twitterHandle,
    images: [ogImageMeta.url],
  },
};

const contactSchema = graph(
  {
    "@type": "ContactPage",
    "@id": `${siteConfig.url}/contact#contactpage`,
    url: `${siteConfig.url}/contact`,
    name: `Contact ${siteConfig.name}`,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
    breadcrumb: breadcrumbNode([{ name: "Contact", path: "/contact" }]),
  },
  personNode,
);

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(contactSchema) }}
      />
      {children}
    </>
  );
}
