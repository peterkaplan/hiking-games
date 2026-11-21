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
      <p className="bg-shop-mint rounded-2xl px-5 py-4" role="status">
        Thanks! (Sign-up isn&apos;t connected to an email service yet.)
      </p>
    );
  }

  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={inputId}>
        Email address
      </label>
      <input
        autoComplete="email"
        className="border-shop-ink placeholder:text-shop-ink/50 focus-visible:outline-shop-yes min-w-0 flex-1 rounded-full border-2 bg-white px-5 py-3.5 focus-visible:outline-3 focus-visible:outline-offset-2"
        id={inputId}
        placeholder="you@example.com"
        required
        type="email"
      />
      <button
        className="bg-shop-ink text-shop-cream hover:bg-shop-yes-dark focus-visible:outline-shop-yes rounded-full px-7 py-3.5 font-semibold focus-visible:outline-3 focus-visible:outline-offset-2"
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
};
