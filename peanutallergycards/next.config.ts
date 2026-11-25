import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root so Next.js doesn't pick up the parent hiking-games app.
  turbopack: { root: import.meta.dirname },
  // Every page is built ahead of time, so the site is written out as plain
  // files (to out/) and served by Cloudflare with no server. See wrangler.jsonc.
  output: "export",
  // There is no image server, so photos are resized ahead of time by
  // scripts/build-images.mjs and src/image-loader.ts picks one per screen.
  // Photos are shown with src/components/photo.tsx (AVIF, then WebP).
  // Keep the sizes in step with WIDTHS in that script.
  images: {
    loader: "custom",
    loaderFile: "./src/image-loader.ts",
    deviceSizes: [480, 720, 800, 1200, 1600],
    imageSizes: [320],
  },
};

export default nextConfig;
