import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <h1 className="text-4xl font-bold text-zinc-100 font-display sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-6 text-zinc-400">
        This page doesn&apos;t exist or has moved.
      </p>
      <nav className="flex gap-6 mt-10 text-sm">
        <Link
          href="/"
          className="text-zinc-400 duration-500 hover:text-zinc-100"
        >
          Home
        </Link>
        <Link
          href="/projects"
          className="text-zinc-400 duration-500 hover:text-zinc-100"
        >
          Projects
        </Link>
        <Link
          href="/contact"
          className="text-zinc-400 duration-500 hover:text-zinc-100"
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}
