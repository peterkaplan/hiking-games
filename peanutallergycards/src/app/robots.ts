import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/seo";

export const dynamic = "force-static";

/**
 * Search engines are kept out until the store is really open: set
 * NEXT_PUBLIC_SITE_LIVE=on in the production build to let them in.
 */
const SITE_LIVE = process.env.NEXT_PUBLIC_SITE_LIVE === "on";

const robots = (): MetadataRoute.Robots => ({
  rules: SITE_LIVE
    ? { userAgent: "*", allow: "/", disallow: "/cart" }
    : { userAgent: "*", disallow: "/" },
  sitemap: `${SITE_URL}/sitemap.xml`,
});

export default robots;
