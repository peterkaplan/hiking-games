import type { PostHog } from "posthog-js";
import { useSyncExternalStore } from "react";
import { POSTHOG_HOST, POSTHOG_KEY, POSTHOG_ON } from "@/content/analytics";

/*
 * PostHog, loaded late, with cookies only where they are allowed.
 *
 * Late: the script is big, so it is only fetched when the visitor first
 * does something, or five seconds after the page has loaded
 * (src/components/product-analytics.tsx), or when the first event is sent.
 *
 * Cookies: PostHog sets a cookie so it can tell when someone comes back.
 * Visitors in the UK and Europe are asked first (src/components/shop/
 * cookie-banner.tsx); the Worker's /api/region says who they are. Until
 * they say yes, and after a no, PostHog sets no cookies and saves nothing
 * in the browser (`cookieless_mode: "on_reject"`). Everyone else gets the
 * cookie straight away (recorded as a yes) and can say no with "Cookie
 * settings" in the footer.
 *
 * Cookie-free events are thrown away unless cookieless mode is also on in
 * the PostHog project's settings. Keep it on.
 *
 * No session recordings, surveys or chat, and no extra scripts fetched from
 * PostHog. Never send anything that says who a person is: no email
 * addresses, no names. Keep the privacy page (src/content/privacy.ts) in
 * step with what is sent here.
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

/* The cookie question, shared with the banner ----------------------------- */

export type CookieChoice = "granted" | "denied" | "pending";

export interface CookieQuestion {
  /** What the visitor has said so far. */
  choice: CookieChoice;
  /** "first-visit": asked unprompted. "settings": opened from the footer. */
  showing: "first-visit" | "hidden" | "settings";
}

const HIDDEN: CookieQuestion = { choice: "pending", showing: "hidden" };
let question: CookieQuestion = HIDDEN;
const listeners = new Set<() => void>();

const setQuestion = (next: CookieQuestion) => {
  question = next;
  for (const listener of listeners) {
    listener();
  }
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** The banner's state, live. Hidden on the server and on first paint. */
export const useCookieQuestion = (): CookieQuestion =>
  useSyncExternalStore(
    subscribe,
    () => question,
    () => HIDDEN
  );

/* Loading ----------------------------------------------------------------- */

/** True when this visitor must be asked first, or when we can't tell. */
const mustAskFirst = async (): Promise<boolean> => {
  try {
    const response = await fetch("/api/region", { cache: "no-store" });
    if (!response.ok) {
      return true;
    }
    const body: unknown = await response.json();
    const allowed =
      typeof body === "object" &&
      body !== null &&
      "askFirst" in body &&
      body.askFirst === false;
    return !allowed;
  } catch {
    return true;
  }
};

let client: Promise<PostHog | null> | null = null;

const start = async (): Promise<PostHog | null> => {
  try {
    const [{ default: posthog }, askFirst] = await Promise.all([
      import("posthog-js"),
      mustAskFirst(),
    ]);
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      // Pins PostHog's behaviour to this date; page views follow the address.
      defaults: "2026-08-30",
      // No cookies until a yes where we must ask, and never after a no.
      cookieless_mode: "on_reject",
      opt_out_capturing_by_default: askFirst,
      advanced_disable_feature_flags: true,
      disable_conversations: true,
      disable_external_dependency_loading: true,
      disable_product_tours: true,
      disable_session_recording: true,
      disable_surveys: true,
    });
    if (posthog.get_explicit_consent_status() === "pending") {
      if (askFirst) {
        setQuestion({ choice: "pending", showing: "first-visit" });
      } else {
        // Outside the UK and Europe cookies are on unless the visitor says
        // no. PostHog's "on_reject" mode records nothing until it has an
        // answer, so give it this one.
        posthog.opt_in_capturing({ captureEventName: false });
      }
    }
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

/** Runs something on PostHog once it has loaded. Never throws. */
const withPostHog = (task: (posthog: PostHog | null) => void) => {
  loadPostHog()
    .then(task)
    .catch(() => {
      // Counting must never get in the way of shopping.
    });
};

/** Sends one shop event. Never throws, never holds the page up. */
export const capture = (
  name: ShopEventName,
  properties: EventProperties = {}
) => {
  withPostHog((posthog) => posthog?.capture(name, properties));
};

/* The visitor's answer ---------------------------------------------------- */

export const acceptCookies = () => {
  setQuestion({ choice: "granted", showing: "hidden" });
  withPostHog((posthog) => posthog?.opt_in_capturing());
};

export const rejectCookies = () => {
  setQuestion({ choice: "denied", showing: "hidden" });
  withPostHog((posthog) => posthog?.opt_out_capturing());
};

export const closeCookieQuestion = () => {
  setQuestion({ ...question, showing: "hidden" });
};

/** "Cookie settings" in the footer: ask again, showing the current answer. */
export const openCookieSettings = () => {
  withPostHog((posthog) => {
    setQuestion({
      choice: posthog?.get_explicit_consent_status() ?? question.choice,
      showing: "settings",
    });
  });
};
