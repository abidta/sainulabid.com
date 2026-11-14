import Link from "next/link";
import type { Metadata } from "next";
import Particles from "./components/particles";
import { RequestLine } from "./components/request-line";

export const metadata: Metadata = {
  title: "404: Page not found",
  robots: { index: false, follow: true },
};

const links = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

/**
 * Same visual language as the homepage hero: particles, glow lines and the
 * outlined display title, with the status code as the headline.
 */
export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen px-6 overflow-hidden text-center bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />

      <div className="hidden w-screen h-px md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <h1 className="z-10 py-3.5 px-0.5 text-transparent bg-white cursor-default text-8xl sm:text-9xl md:text-[12rem] font-display text-edge-outline bg-clip-text animate-title motion-reduce:animate-none">
        <span className="sr-only">Error </span>404
      </h1>
      <div className="hidden w-screen h-px md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      <div className="flex flex-col items-center gap-6 mt-12 animate-fade-in-fast motion-reduce:animate-none">
        <p className="text-lg font-display text-zinc-100 sm:text-xl">
          This page doesn&apos;t exist or has moved.
        </p>
        <RequestLine />
        <nav aria-label="Pages" className="mt-4">
          <ul className="flex gap-6 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="duration-500 text-zinc-500 hover:text-zinc-100"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
