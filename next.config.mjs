import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
	},
	// Browsers and some crawlers request /favicon.ico directly. Serve the
	// generated app/icon.tsx PNG there instead of a 404.
	async rewrites() {
		return [{ source: "/favicon.ico", destination: "/icon" }];
	},
	webpack(config) {
		        config.watchOptions = {
          ignored: [
            '**/node_modules', // Ignore node_modules
          ],
        };
		return config;
	}
};

export default withContentlayer(nextConfig);
