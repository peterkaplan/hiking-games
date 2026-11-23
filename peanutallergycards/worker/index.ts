/**
 * The only code that runs on Cloudflare. Everything else on the site is
 * plain files, served for free without touching this.
 *
 *   POST /api/subscribe          save an email address to the mailing list
 *   POST /api/unsubscribe        delete an email address from it
 *   GET  /admin/subscribers      the list, for the owner (password)
 *   GET  /admin/subscribers.csv  the same, as a spreadsheet file
 *
 * wrangler.jsonc sends only /api/* and /admin/* here. The list lives in the
 * D1 database "peanutallergycards" (migrations/). The password is the
 * Worker secret ADMIN_PASSWORD, set in the Cloudflare dashboard; it is never
 * in this repository.
 */

interface Env {
  ADMIN_PASSWORD?: string;
  ASSETS: Fetcher;
  DB: D1Database;
}

interface Subscriber {
  country: string;
  created_at: string;
  email: string;
  source: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;
const MAX_EMAIL_LENGTH = 254;
const MAX_BODY_LENGTH = 2000;
const MAX_SOURCE_LENGTH = 100;
const BASIC_PREFIX = "Basic ";
/** Cells a spreadsheet would run as a formula if they started like this. */
const FORMULA_START = /^[=+\-@\t\r]/u;
const QUOTE = /"/gu;
const HTML_SPECIAL = /[&<>"']/gu;

const PRIVATE_HEADERS = {
  "cache-control": "no-store",
  "x-robots-tag": "noindex",
  "x-content-type-options": "nosniff",
};

const json = (body: Record<string, unknown>, status = 200): Response =>
  Response.json(body, { status, headers: PRIVATE_HEADERS });

/* Sign-up ----------------------------------------------------------------- */

const readSignUp = async (
  request: Request
): Promise<Record<string, unknown> | null> => {
  const text = await request.text();
  if (text.length > MAX_BODY_LENGTH) {
    return null;
  }
  try {
    const data: unknown = JSON.parse(text);
    return typeof data === "object" && data !== null
      ? (data as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
};

/** Only our own pages may post here, not a form on someone else's site. */
const fromOurSite = (request: Request): boolean => {
  const origin = request.headers.get("origin");
  return !origin || URL.parse(origin)?.host === new URL(request.url).host;
};

const subscribe = async (request: Request, env: Env): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ ok: false, error: "method" }, 405);
  }
  if (!fromOurSite(request)) {
    return json({ ok: false, error: "origin" }, 403);
  }
  const data = await readSignUp(request);
  if (!data) {
    return json({ ok: false, error: "body" }, 400);
  }
  // A hidden field people never see. Only a bot fills it in: say thanks,
  // save nothing.
  if (typeof data.website === "string" && data.website !== "") {
    return json({ ok: true });
  }
  const email =
    typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return json({ ok: false, error: "email" }, 400);
  }
  const source =
    typeof data.page === "string" ? data.page.slice(0, MAX_SOURCE_LENGTH) : "";
  const country = request.headers.get("cf-ipcountry") ?? "";

  // Signing up twice is fine: the first row stays.
  await env.DB.prepare(
    "INSERT INTO subscribers (email, created_at, source, country) VALUES (?1, ?2, ?3, ?4) ON CONFLICT (email) DO NOTHING"
  )
    .bind(email, new Date().toISOString(), source, country)
    .run();
  return json({ ok: true });
};

/**
 * "Take me off the list", from the privacy page. The answer is the same
 * whether or not the address was there, so nobody can use this to find out
 * who has signed up.
 */
const unsubscribe = async (request: Request, env: Env): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ ok: false, error: "method" }, 405);
  }
  if (!fromOurSite(request)) {
    return json({ ok: false, error: "origin" }, 403);
  }
  const data = await readSignUp(request);
  const email =
    typeof data?.email === "string" ? data.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return json({ ok: false, error: "email" }, 400);
  }
  await env.DB.prepare("DELETE FROM subscribers WHERE email = ?1")
    .bind(email)
    .run();
  return json({ ok: true });
};

/* The owner's list --------------------------------------------------------- */

const digest = (text: string): Promise<ArrayBuffer> =>
  crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));

/** The password from the browser's sign-in box, or null. */
const passwordFrom = (request: Request): string | null => {
  const header = request.headers.get("authorization") ?? "";
  if (!header.startsWith(BASIC_PREFIX)) {
    return null;
  }
  try {
    const decoded = atob(header.slice(BASIC_PREFIX.length));
    return decoded.slice(decoded.indexOf(":") + 1);
  } catch {
    return null;
  }
};

/** Compared as hashes, in constant time, so timing gives nothing away. */
const passwordMatches = async (
  given: string,
  expected: string
): Promise<boolean> => {
  const [a, b] = await Promise.all([digest(given), digest(expected)]);
  return crypto.subtle.timingSafeEqual(a, b);
};

const escapeHtml = (text: string): string =>
  text.replace(HTML_SPECIAL, (character) => `&#${character.charCodeAt(0)};`);

const csvCell = (text: string): string => {
  const safe = FORMULA_START.test(text) ? `'${text}` : text;
  return `"${safe.replace(QUOTE, '""')}"`;
};

const asCsv = (rows: readonly Subscriber[]): string =>
  [
    "email,signed_up,page,country",
    ...rows.map((row) =>
      [row.email, row.created_at, row.source, row.country]
        .map(csvCell)
        .join(",")
    ),
  ].join("\r\n");

const asPage = (rows: readonly Subscriber[]): string => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mailing list | Peanut Allergy Cards</title>
<style>
body{font:16px/1.5 system-ui,sans-serif;margin:0;padding:24px;background:#faeddf;color:#000}
h1{font-size:28px;margin:0 0 4px}
a{color:#0e5540;font-weight:600}
table{border-collapse:collapse;width:100%;margin-top:20px;background:#fffaf5}
th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #000;overflow-wrap:anywhere}
</style>
</head>
<body>
<h1>Mailing list</h1>
<p>${rows.length} ${rows.length === 1 ? "person" : "people"} signed up. <a href="/admin/subscribers.csv">Download as a spreadsheet (CSV)</a></p>
<table>
<thead><tr><th scope="col">Email</th><th scope="col">Signed up (UTC)</th><th scope="col">Page</th><th scope="col">Country</th></tr></thead>
<tbody>
${rows
  .map(
    (row) =>
      `<tr><td>${escapeHtml(row.email)}</td><td>${escapeHtml(row.created_at.slice(0, 16).replace("T", " "))}</td><td>${escapeHtml(row.source)}</td><td>${escapeHtml(row.country)}</td></tr>`
  )
  .join("\n")}
</tbody>
</table>
</body>
</html>`;

const admin = async (
  request: Request,
  env: Env,
  wantsCsv: boolean
): Promise<Response> => {
  if (!env.ADMIN_PASSWORD) {
    return new Response(
      "The list is locked: no password has been set yet. Add a secret named ADMIN_PASSWORD to this Worker in the Cloudflare dashboard.",
      { status: 503, headers: PRIVATE_HEADERS }
    );
  }
  const given = passwordFrom(request);
  if (given === null || !(await passwordMatches(given, env.ADMIN_PASSWORD))) {
    return new Response("Password needed.", {
      status: 401,
      headers: {
        ...PRIVATE_HEADERS,
        "www-authenticate": 'Basic realm="Mailing list", charset="UTF-8"',
      },
    });
  }
  const { results } = await env.DB.prepare(
    "SELECT email, created_at, source, country FROM subscribers ORDER BY created_at DESC"
  ).all<Subscriber>();

  if (wantsCsv) {
    return new Response(asCsv(results), {
      headers: {
        ...PRIVATE_HEADERS,
        "content-type": "text/csv; charset=utf-8",
        "content-disposition":
          'attachment; filename="peanutallergycards-mailing-list.csv"',
      },
    });
  }
  return new Response(asPage(results), {
    headers: {
      ...PRIVATE_HEADERS,
      "content-type": "text/html; charset=utf-8",
      "content-security-policy":
        "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'",
    },
  });
};

/* Routing ------------------------------------------------------------------ */

const route = (request: Request, env: Env): Promise<Response> => {
  const { pathname } = new URL(request.url);
  if (pathname === "/api/subscribe") {
    return subscribe(request, env);
  }
  if (pathname === "/api/unsubscribe") {
    return unsubscribe(request, env);
  }
  if (pathname === "/admin/subscribers") {
    return admin(request, env, false);
  }
  if (pathname === "/admin/subscribers.csv") {
    return admin(request, env, true);
  }
  // Anything else is a page or file (or the "not found" page).
  return env.ASSETS.fetch(request);
};

export default {
  async fetch(request, env): Promise<Response> {
    try {
      return await route(request, env);
    } catch (error) {
      // Goes to the Worker's logs (Cloudflare dashboard > Logs).
      console.error("Request failed", new URL(request.url).pathname, error);
      return json({ ok: false, error: "server" }, 500);
    }
  },
} satisfies ExportedHandler<Env>;
