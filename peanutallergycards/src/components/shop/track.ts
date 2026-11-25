import type { CartLine } from "@/content/pricing";

/*
 * Tells us when someone adds to the cart or presses Checkout, so we know
 * people are trying to buy. It sends what is in the cart and the page, and
 * nothing about who the person is. The Worker (worker/index.ts) saves it;
 * the owner reads it at /admin/events. Keep the privacy page in step.
 */

export type TrackedEvent = "add_to_cart" | "checkout_click";

const describe = (lines: readonly CartLine[]): string =>
  lines.map((line) => `${line.slug}:${line.format}`).join(",");

export const track = (name: TrackedEvent, lines: readonly CartLine[]) => {
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
