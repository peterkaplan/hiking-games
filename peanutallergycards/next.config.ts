import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root so Next.js doesn't pick up the parent hiking-games app.
  turbopack: { root: import.meta.dirname },
  // PREVIEW_EXPORT=1 writes the site as plain files (to out/) for a preview
  // that needs no server. Normal builds are unaffected.
  ...(process.env.PREVIEW_EXPORT ? { output: "export" as const } : {}),
};

export default nextConfig;
