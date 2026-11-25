/**
 * PostHog: shows how the shop is used. Which pages are opened, which
 * buttons are pressed, and the shop events sent from
 * src/components/posthog.ts (add to cart, Checkout, email sign-up).
 *
 * It is off until a project key is filled in below. The key names our
 * project in PostHog (Settings > Project > "Project API key", starts
 * "phc_"). It is public by design: it is in the page source of every site
 * that uses PostHog. Set NEXT_PUBLIC_POSTHOG_KEY to send a build's events to
 * another project, or to an empty string to switch PostHog off.
 *
 * The host is the region the project was made in:
 * https://us.i.posthog.com or https://eu.i.posthog.com. If it changes,
 * change connect-src in public/_headers too.
 */
const PROJECT_KEY = "phc_DhGXUVUPV8a2XesmLHTtFEBGA7X5LYU4AeHrFs4fSx6U";

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? PROJECT_KEY;

export const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

/** The privacy page only mentions PostHog while this is true. */
export const POSTHOG_ON = POSTHOG_KEY !== "";
