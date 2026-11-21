import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { hasPublishedBlogs } from "../lib/content";
import { siteConfig } from "../lib/site";

const socials = [
	{
		key: "linkedin",
		icon: <Linkedin size={20} />,
		href: siteConfig.socials.linkedin,
		label: "LinkedIn",
		handle: "abidta",
	},
	{	key: "twitter",
		icon: <Twitter size={20} />,
		href: siteConfig.socials.twitter,
		label: "X / Twitter",
		handle: "@sainul_abid_",
	},
	{
		key: "email",
		icon: <Mail size={20} />,
		href: "mailto:sainulabidofficial@gmail.com",
		label: "Email",
		// Allow a line break only before the "@" so the address never splits mid-word.
		handle: (
			<>
				sainulabidofficial
				<wbr />
				@gmail.com
			</>
		),
	},
	{	key: "github",
		icon: <Github size={20} />,
		href: siteConfig.socials.github,
		label: "Github",
		handle: "abidta",
	},
];

export default function Example() {
	return (
		<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation showBlog={hasPublishedBlogs} />
			<div className="container flex items-center justify-center min-h-screen px-4 py-24 mx-auto">
				<h1 className="sr-only">
					Contact Sainul Abid — Node.js &amp; full stack developer
				</h1>
				<div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-2 xl:grid-cols-4 lg:gap-16">
					{socials.map((s) => (
						<Card key={s.key}>
							<Link
								href={s.href}
								target="_blank"
								rel={s.key === "email" ? undefined : "me noopener"}
								className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:px-8"
							>
								<span
									className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
									aria-hidden="true"
								/>
								<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
									{s.icon}
								</span>{" "}
								<div className="z-10 flex flex-col items-center">
									<span className="lg:text-xl font-medium duration-150 text-center break-words text-zinc-200 group-hover:text-white font-display">
										{s.handle}
									</span>
									<span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
										{s.label}
									</span>
								</div>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
