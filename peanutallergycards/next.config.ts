import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root so Next.js doesn't pick up the parent hiking-games app.
  turbopack: { root: import.meta.dirname },
  // Every page is built ahead of time, so the site is written out as plain
  // files (to out/) and served by Cloudflare with no server. See wrangler.jsonc.
  output: "export",
};

export default nextConfig;
