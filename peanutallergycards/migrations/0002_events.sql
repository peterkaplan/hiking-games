-- Buying signals: one row each time someone adds to the cart or presses
-- Checkout. No email, no IP address, nothing that identifies a person.
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  -- "add_to_cart" or "checkout_click".
  name TEXT NOT NULL,
  -- What was in the cart, e.g. "japan:printed,thailand:digital".
  detail TEXT NOT NULL DEFAULT '',
  -- The page it happened on, e.g. "/cart".
  page TEXT NOT NULL DEFAULT '',
  -- Two-letter country the request came from, as reported by Cloudflare.
  country TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS events_created_at ON events (created_at);
