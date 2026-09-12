import type { Metadata } from "next";
import { siteConfig, ogImageMeta } from "../lib/site";
import { jsonLd } from "../lib/json-ld";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — ${siteConfig.jobTitle} based in ${siteConfig.location.locality}, ${siteConfig.location.country}. Available for freelance and contract work.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `Email, GitHub and X/Twitter for ${siteConfig.name}.`,
    url: "/contact",
    type: "profile",
    images: [ogImageMeta],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: `Contact ${siteConfig.name}`,
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.jobTitle,
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.locality,
      addressCountry: siteConfig.location.country,
    },
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.twitter,
      siteConfig.socials.website,
    ],
  },
};

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
