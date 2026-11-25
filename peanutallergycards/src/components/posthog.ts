import type { PostHog } from "posthog-js";
import { POSTHOG_HOST, POSTHOG_KEY, POSTHOG_ON } from "@/content/analytics";

/*
 * PostHog, loaded late and kept quiet.
 *
 * Late: the script is big, so it is only fetched once the page is idle
 * (src/components/product-analytics.tsx) or when the first event is sent.
 *
 * Quiet: no cookies and nothing saved in the browser (`cookieless_mode`),
 * so the site needs no cookie banner. No session recordings, surveys or
 * chat, and no extra scripts fetched from PostHog. Never send anything that
 * says who a person is: no email addresses, no names. Keep the privacy page
 * (src/content/privacy.ts) in step with what is sent here.
 *
 * Cookieless mode must also be switched on in the PostHog project
 * (Settings > Web analytics > Cookieless server hash mode), or PostHog
 * throws every event away.
 */

/** Every shop event we send by name. Page views and clicks are automatic. */
export type ShopEventName =
  | "add_to_cart"
  | "checkout_click"
  | "format_selected"
  | "newsletter_signup"
  | "newsletter_unsubscribe"
  | "remove_from_cart";

type EventProperties = Record<
  string,
  boolean | number | string | readonly string[]
>;

/** Off in `npm run dev`, and until a project key is set. */
const enabled = process.env.NODE_ENV === "production" && POSTHOG_ON;

let client: Promise<PostHog | null> | null = null;

const start = async (): Promise<PostHog | null> => {
  try {
    const { default: posthog } = await import("posthog-js");
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      // Pins PostHog's behaviour to this date; page views follow the address.
      defaults: "2026-08-30",
      cookieless_mode: "always",
      advanced_disable_feature_flags: true,
      disable_conversations: true,
      disable_external_dependency_loading: true,
      disable_product_tours: true,
      disable_session_recording: true,
      disable_surveys: true,
    });
    return posthog;
  } catch {
    // Blocked or offline: the shop works the same without it.
    return null;
  }
};

/** Fetches and starts PostHog once. Safe to call again. */
export const loadPostHog = (): Promise<PostHog | null> => {
  if (!enabled) {
    return Promise.resolve(null);
  }
  client ??= start();
  return client;
};

/** Sends one shop event. Never throws, never holds the page up. */
export const capture = (
  name: ShopEventName,
  properties: EventProperties = {}
) => {
  loadPostHog()
    .then((posthog) => posthog?.capture(name, properties))
    .catch(() => {
      // Counting must never get in the way of shopping.
    });
};
