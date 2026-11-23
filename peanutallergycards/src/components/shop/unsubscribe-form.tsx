"use client";

import type { FormEvent } from "react";
import { useCallback, useId, useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

/**
 * "Take me off the list." Posts to /api/unsubscribe (worker/index.ts), which
 * deletes the address. The answer is the same whether or not the address
 * was on the list, so the form can't be used to find out who is.
 */
export const UnsubscribeForm = () => {
  const inputId = useId();
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const fields = new FormData(event.currentTarget);
      setStatus("sending");
      try {
        const response = await fetch("/api/unsubscribe", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: fields.get("email") }),
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
        Done. If that address was on our list, it&apos;s gone.
      </p>
    );
  }

  return (
    <div>
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={handleSubmit}
      >
        <div className="min-w-0 flex-1">
          <label className="font-mono text-xs uppercase" htmlFor={inputId}>
            Email address
          </label>
          <input
            autoComplete="email"
            className="border-shop-ink bg-shop-panel mt-2 w-full rounded-full border-2 px-5 py-3"
            id={inputId}
            name="email"
            required
            type="email"
          />
        </div>
        <button
          className="border-shop-ink hover:bg-shop-ink hover:text-shop-bg shrink-0 rounded-full border-2 px-7 py-3 font-semibold transition disabled:opacity-60"
          disabled={status === "sending"}
          type="submit"
        >
          {status === "sending" ? "Removing…" : "Remove me"}
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
