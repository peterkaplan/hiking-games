"use client";

import type { FormEvent } from "react";
import { useCallback, useId, useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Email sign-up. Posts to /api/subscribe (worker/index.ts), which saves the
 * address to the mailing list. The owner reads the list at
 * /admin/subscribers.
 */
export const NewsletterForm = () => {
  const inputId = useId();
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const fields = new FormData(event.currentTarget);
      setStatus("sending");
      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email: fields.get("email"),
            website: fields.get("website"),
            page: window.location.pathname,
          }),
        });
        setStatus(response.ok ? "done" : "error");
      } catch {
        setStatus("error");
      }
    },
    []
  );

  if (status === "done") {
    return (
      <p
        className="bg-shop-highlight text-shop-on-highlight rounded-2xl px-5 py-4"
        role="status"
      >
        You&apos;re on the list. Talk soon!
      </p>
    );
  }

  return (
    <div>
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
          name="email"
          placeholder="Your email…"
          required
          type="email"
        />
        {/* Hidden from people; only a bot fills it in, and is then ignored. */}
        <div hidden>
          <label>
            Leave this empty
            <input autoComplete="off" name="website" type="text" />
          </label>
        </div>
        <button
          className="bg-shop-highlight text-shop-on-highlight hover:bg-shop-on-band focus-visible:outline-shop-on-band shrink-0 rounded-full px-6 py-3 font-semibold focus-visible:outline-3 focus-visible:outline-offset-2 disabled:opacity-60"
          disabled={status === "sending"}
          type="submit"
        >
          {status === "sending" ? "Sending…" : "Sign up"}{" "}
          <span aria-hidden="true">→</span>
        </button>
      </form>
      {status === "error" ? (
        <p className="mt-3 text-base" role="alert">
          That didn&apos;t go through. Please try again.
        </p>
      ) : null}
    </div>
  );
};
