import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
	},
	// The favicon used to be generated at /icon?<hash>. It is now the static
	// app/favicon.ico (a stable URL, as Google asks). Send the old URL there.
	async redirects() {
		return [{ source: "/icon", destination: "/favicon.ico", permanent: true }];
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
