"use client";

import { useEffect } from "react";
import { loadPostHog } from "./posthog";

/** How long to wait when the browser can't tell us it is idle (Safari). */
const FALLBACK_DELAY_MS = 2000;
/** Start anyway after this long, however busy the page is. */
const IDLE_TIMEOUT_MS = 4000;

/**
 * Starts PostHog (src/components/posthog.ts) once the page has finished its
 * own work, so it never slows the first view. Renders nothing.
 */
export const ProductAnalytics = () => {
  useEffect(() => {
    const begin = () => {
      loadPostHog().catch(() => {
        // Already handled inside; nothing to do here.
      });
    };
    if ("requestIdleCallback" in window) {
      const idle = window.requestIdleCallback(begin, {
        timeout: IDLE_TIMEOUT_MS,
      });
      return () => window.cancelIdleCallback(idle);
    }
    const timer = setTimeout(begin, FALLBACK_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);
  return null;
};
