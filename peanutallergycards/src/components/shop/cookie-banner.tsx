"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import {
  acceptCookies,
  closeCookieQuestion,
  openCookieSettings,
  rejectCookies,
  useCookieQuestion,
} from "@/components/posthog";

const choiceButton =
  "inline-flex flex-1 items-center justify-center rounded-full border-2 border-shop-ink bg-shop-panel px-5 py-2.5 font-semibold transition hover:bg-shop-ink hover:text-shop-bg sm:flex-none";

const answers = {
  granted: "Cookies are on.",
  denied: "Cookies are off.",
  pending: "",
} as const;

/**
 * The cookie question. Shown unprompted only to visitors in the UK and
 * Europe (see src/components/posthog.ts), and to anyone who presses
 * "Cookie settings" in the footer. Yes and no are the same size: saying no
 * must be as easy as saying yes. It doesn't block the page.
 */
export const CookieBanner = () => {
  const { choice, showing } = useCookieQuestion();
  const headingId = useId();
  const firstButton = useRef<HTMLButtonElement>(null);

  // Opened from the footer: move the keyboard to the question.
  useEffect(() => {
    if (showing === "settings") {
      firstButton.current?.focus();
    }
  }, [showing]);

  if (showing === "hidden") {
    return null;
  }

  return (
    <section
      aria-labelledby={headingId}
      className="bg-shop-panel border-shop-ink fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border-2 p-5 text-base shadow-[0_4px_0_0_var(--color-shop-ink)] sm:inset-x-6 sm:bottom-6"
    >
      <h2 className="font-semibold" id={headingId}>
        Can we use cookies?
      </h2>
      <p className="mt-1">
        They tell us when someone comes back, so we can see what helps people
        choose a card. No ads, and nothing is sold.{" "}
        <Link className="underline underline-offset-4" href="/privacy">
          Privacy policy
        </Link>
      </p>
      {answers[choice] ? (
        <p className="mt-2 font-mono text-xs uppercase">{answers[choice]}</p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          className={choiceButton}
          onClick={acceptCookies}
          ref={firstButton}
          type="button"
        >
          Yes, that&apos;s fine
        </button>
        <button className={choiceButton} onClick={rejectCookies} type="button">
          No thanks
        </button>
        {showing === "settings" ? (
          <button
            className="rounded-sm px-2 py-2.5 underline underline-offset-4"
            onClick={closeCookieQuestion}
            type="button"
          >
            Close
          </button>
        ) : null}
      </div>
    </section>
  );
};

/** For the footer: lets anyone change their answer. */
export const CookieSettingsButton = ({ className }: { className: string }) => (
  <button className={className} onClick={openCookieSettings} type="button">
    Cookie settings
  </button>
);
