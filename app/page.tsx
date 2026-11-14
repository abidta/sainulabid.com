import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { siteConfig, sameAs } from "./lib/site";
import { jsonLd } from "./lib/json-ld";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
  { name: "Blogs", href: "/blogs" },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
  jobTitle: siteConfig.jobTitle,
  email: `mailto:${siteConfig.email}`,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.locality,
    addressCountry: siteConfig.location.country,
  },
  knowsAbout: siteConfig.skills,
  sameAs,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
};

const inlineLink =
  "text-zinc-200 underline underline-offset-4 duration-500 hover:text-white";

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd([personSchema, websiteSchema]),
          }}
        />
        <nav className="my-16 animate-fade-in">
          <ul className="flex items-center justify-center gap-4">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
        <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
          {siteConfig.name}
        </h1>

        <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        <div className="my-16 text-center animate-fade-in">
          <p className="px-6 text-sm text-zinc-500">
            I build web applications end to end — Node.js and TypeScript
            backends, React frontends, and now AI-powered products.{" "}
            <Link
              href="/projects"
              className="underline duration-500 hover:text-zinc-300"
            >
              See what I&apos;ve built
            </Link>
            .
          </p>
        </div>
      </div>
      <section
        aria-labelledby="about-heading"
        className="px-6 py-24 bg-black md:py-32"
      >
        <div className="max-w-2xl mx-auto space-y-6 text-zinc-400 leading-relaxed">
          <h2
            id="about-heading"
            className="text-2xl font-bold tracking-tight text-zinc-100 font-display sm:text-3xl"
          >
            About
          </h2>
          <p>
            I&apos;m a full stack developer based in Kerala, India, with 4 years
            of experience building web applications. Most of my work is on the
            backend — Node.js and TypeScript services, REST APIs and the data
            models behind them — with React on the front.
          </p>
          <p>
            I also take care of what happens after the code is written: Docker,
            CI pipelines with GitHub Actions, and deployments on AWS, Google
            Cloud and Azure.
          </p>
          <p>
            Right now I&apos;m building Llayam, an AI product that gives
            businesses decision models they can fine-tune on their own data,
            with a Node.js API and Python services for inference and training. I
            also publish open source libraries on npm:{" "}
            <Link href="/projects/denormo" className={inlineLink}>
              denormo
            </Link>
            ,{" "}
            <Link href="/projects/nest-exception" className={inlineLink}>
              nest-exception
            </Link>{" "}
            and{" "}
            <Link href="/projects/useipa" className={inlineLink}>
              useipa
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
