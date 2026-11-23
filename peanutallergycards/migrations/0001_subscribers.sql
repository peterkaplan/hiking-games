-- The mailing list. One row per email address.
CREATE TABLE IF NOT EXISTS subscribers (
  email TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  -- The page the person signed up on, e.g. "/japan".
  source TEXT NOT NULL DEFAULT '',
  -- Two-letter country the request came from, as reported by Cloudflare.
  country TEXT NOT NULL DEFAULT ''
);
