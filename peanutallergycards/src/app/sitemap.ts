import type { MetadataRoute } from "next";
import { catalogue } from "@/content/catalogue";

export const dynamic = "force-static";

const SITE_URL = "https://peanutallergycards.com";

const sitemap = (): MetadataRoute.Sitemap =>
  [
    "",
    "/trip-pack",
    "/our-story",
    "/terms",
    ...catalogue.map(({ slug }) => `/${slug}`),
  ].map((path) => ({ url: `${SITE_URL}${path}` }));

export default sitemap;
