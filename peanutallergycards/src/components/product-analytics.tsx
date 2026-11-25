"use client";

import { useEffect } from "react";
import { loadPostHog } from "./posthog";

/** How long after the page has loaded to start, if the visitor does nothing. */
const QUIET_START_MS = 5000;

/** The first sign that someone is using the page. */
const FIRST_ACTIONS = [
  "keydown",
  "pointerdown",
  "pointermove",
  "scroll",
  "touchstart",
] as const;

/**
 * Starts PostHog (src/components/posthog.ts) when the visitor first does
 * something, or five seconds after the page has loaded, whichever comes
 * first. Its script is large, so it stays out of the way while the page
 * loads. Renders nothing.
 *
 * The cost: someone who leaves within five seconds without touching the
 * page is not in PostHog. Cloudflare Web Analytics still counts them.
 */
export const ProductAnalytics = () => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const stopWaiting = () => {
      for (const action of FIRST_ACTIONS) {
        window.removeEventListener(action, begin);
      }
      window.removeEventListener("load", startTimer);
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
    function begin() {
      stopWaiting();
      loadPostHog().catch(() => {
        // Already handled inside; nothing to do here.
      });
    }
    function startTimer() {
      timer = setTimeout(begin, QUIET_START_MS);
    }

    for (const action of FIRST_ACTIONS) {
      window.addEventListener(action, begin, { passive: true });
    }
    if (document.readyState === "complete") {
      startTimer();
    } else {
      window.addEventListener("load", startTimer);
    }
    return stopWaiting;
  }, []);
  return null;
};
