"use client";

import type { FormEvent } from "react";
import { useCallback, useId, useState } from "react";

/**
 * Email sign-up. Not connected to an email service yet: it only confirms
 * locally, and says so.
 */
export const NewsletterForm = () => {
  const inputId = useId();
  const [sent, setSent] = useState(false);
  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  }, []);

  if (sent) {
    return (
      <p
        className="bg-shop-highlight text-shop-on-highlight rounded-2xl px-5 py-4"
        role="status"
      >
        Thanks! (Sign-up isn&apos;t connected to an email service yet.)
      </p>
    );
  }

  return (
    <form
      className="border-shop-on-band flex items-center gap-3 border-b-2 pb-3"
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor={inputId}>
        Email address
      </label>
      <input
        autoComplete="email"
        className="placeholder:text-shop-highlight text-shop-on-band focus-visible:outline-shop-highlight min-w-0 flex-1 rounded-sm bg-transparent py-2 font-serif text-2xl focus-visible:outline-3 focus-visible:outline-offset-4 sm:text-3xl"
        id={inputId}
        placeholder="Your email…"
        required
        type="email"
      />
      <button
        className="bg-shop-highlight text-shop-on-highlight hover:bg-shop-on-band focus-visible:outline-shop-on-band shrink-0 rounded-full px-6 py-3 font-semibold focus-visible:outline-3 focus-visible:outline-offset-2"
        type="submit"
      >
        Sign up <span aria-hidden="true">→</span>
      </button>
    </form>
  );
};
