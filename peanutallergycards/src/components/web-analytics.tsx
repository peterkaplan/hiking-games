/**
 * Cloudflare Web Analytics: counts visits, pages, referrers, countries and
 * page speed. It sets no cookies and doesn't follow people between sites,
 * so no consent banner is needed.
 *
 * The token names the site in Cloudflare (Analytics & Logs > Web Analytics).
 * It is public by design: it is in the page source of every site that uses
 * it. This one belongs to peanutallergycards.com; set
 * NEXT_PUBLIC_CF_ANALYTICS_TOKEN to count a build under another site.
 */
const SITE_TOKEN = "4f86eb14a7fb49f1a536fd982c6c4d31";

const token = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ?? SITE_TOKEN;

/** Off in `npm run dev`, and when the token is set to an empty string. */
const enabled = process.env.NODE_ENV === "production" && token !== "";

export const WebAnalytics = () =>
  enabled ? (
    <script
      data-cf-beacon={JSON.stringify({ token })}
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
    />
  ) : null;
