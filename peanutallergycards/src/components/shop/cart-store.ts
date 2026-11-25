"use client";

import { useSyncExternalStore } from "react";
import { findCountry } from "@/content/catalogue";
import type { CartLine, FormatId } from "@/content/pricing";
import { formats } from "@/content/pricing";
import { track } from "./track";

/*
 * The cart: one line per country, kept in the browser's local storage so it
 * survives a reload and is shared between tabs. Checkout is not connected
 * yet; when it is, it reads these lines.
 */

const STORAGE_KEY = "peanutallergycards.cart.v1";
const EMPTY: readonly CartLine[] = [];

let lines: readonly CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

const isFormat = (value: unknown): value is FormatId =>
  formats.some((format) => format.id === value);

/** Keep only well-formed lines for countries we sell, one per country. */
const clean = (value: unknown): readonly CartLine[] => {
  if (!Array.isArray(value)) {
    return EMPTY;
  }
  const seen = new Set<string>();
  const result: CartLine[] = [];
  for (const item of value as Partial<CartLine>[]) {
    const slug = typeof item.slug === "string" ? item.slug : "";
    if (findCountry(slug) && isFormat(item.format) && !seen.has(slug)) {
      seen.add(slug);
      result.push({ slug, format: item.format });
    }
  }
  return result;
};

const read = (): readonly CartLine[] => {
  try {
    return clean(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"));
  } catch {
    return EMPTY;
  }
};

const emit = () => {
  for (const listener of listeners) {
    listener();
  }
};

const save = (next: readonly CartLine[]) => {
  lines = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be blocked (private windows): the cart then lasts one visit.
  }
  emit();
};

const handleStorage = (event: StorageEvent) => {
  if (event.key === STORAGE_KEY) {
    lines = read();
    emit();
  }
};

const subscribe = (listener: () => void) => {
  if (listeners.size === 0) {
    window.addEventListener("storage", handleStorage);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", handleStorage);
    }
  };
};

const getSnapshot = (): readonly CartLine[] => {
  if (!loaded) {
    loaded = true;
    lines = read();
  }
  return lines;
};

const getServerSnapshot = (): readonly CartLine[] => EMPTY;

/** The cart's lines, live. Empty on the server and on first paint. */
export const useCart = (): readonly CartLine[] =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

/** Add countries, or change the format of ones already in the cart. */
export const addToCart = (added: readonly CartLine[]) => {
  const slugs = new Set(added.map((line) => line.slug));
  save(
    clean([...getSnapshot().filter((line) => !slugs.has(line.slug)), ...added])
  );
  track("add_to_cart", added);
};

export const removeFromCart = (slug: string) => {
  save(getSnapshot().filter((line) => line.slug !== slug));
};

export const setCartFormat = (slug: string, format: FormatId) => {
  save(
    getSnapshot().map((line) => (line.slug === slug ? { slug, format } : line))
  );
};
