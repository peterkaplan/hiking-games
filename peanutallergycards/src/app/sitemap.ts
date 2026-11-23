import type { MetadataRoute } from "next";
import { catalogue } from "@/content/catalogue";
import { SITE_URL } from "@/content/seo";

export const dynamic = "force-static";

/** When this build was made: the pages are rebuilt together. */
const BUILT = new Date();

const sitemap = (): MetadataRoute.Sitemap =>
  [
    "",
    "/trip-pack",
    "/our-story",
    ...catalogue.map(({ slug }) => `/${slug}`),
  ].map((path) => ({ url: `${SITE_URL}${path}`, lastModified: BUILT }));

export default sitemap;
