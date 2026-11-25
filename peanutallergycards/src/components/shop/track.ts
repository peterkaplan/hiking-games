import { capture } from "@/components/posthog";
import type { CartLine } from "@/content/pricing";
import { cartTotals } from "@/content/pricing";

/*
 * Tells us when someone adds to the cart or presses Checkout, so we know
 * people are trying to buy. It sends what is in the cart and the page, and
 * nothing about who the person is. The Worker (worker/index.ts) saves it;
 * the owner reads it at /admin/events. The same event goes to PostHog
 * (src/components/posthog.ts), which draws the charts. Keep the privacy
 * page in step.
 */

export type TrackedEvent = "add_to_cart" | "checkout_click";

const describe = (lines: readonly CartLine[]): string =>
  lines.map((line) => `${line.slug}:${line.format}`).join(",");

/** The cart lines as PostHog properties: what, how many, and the price. */
const cartProperties = (lines: readonly CartLine[]) => ({
  items: lines.map((line) => `${line.slug}:${line.format}`),
  countries: lines.map((line) => line.slug),
  item_count: lines.length,
  value_usd: cartTotals(lines).total,
});

export const track = (name: TrackedEvent, lines: readonly CartLine[]) => {
  capture(name, cartProperties(lines));
  try {
    const body = JSON.stringify({
      name,
      detail: describe(lines),
      page: window.location.pathname,
    });
    // keepalive lets the request finish if the person leaves the page.
    fetch("/api/event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // Counting must never get in the way of shopping.
    });
  } catch {
    // The same: ignore.
  }
};
