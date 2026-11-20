import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root so Next.js doesn't pick up the parent hiking-games app.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
