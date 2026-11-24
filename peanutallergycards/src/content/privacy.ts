/**
 * The privacy page's words. Keep every sentence true: if we start
 * collecting something new (checkout, a newsletter service, another
 * analytics tool), say so here and change LAST_UPDATED.
 *
 * Plain language, not a lawyer's draft. Have it checked before the store
 * takes payments.
 */

import { CONTACT_EMAIL } from "./contact";

export const LAST_UPDATED = "23 November 2026";

export interface PrivacySection {
  heading: string;
  /** Where the "take me off the list" form goes. */
  id?: string;
  paragraphs: readonly string[];
}

export const privacyIntro =
  "Peanut Allergy Cards is a small shop run by Peter and Julia. This is everything we collect, why, and how to have it removed.";

export const privacySections: readonly PrivacySection[] = [
  {
    heading: "If you join our email list",
    paragraphs: [
      "We save your email address, the date, the page you signed up on and the country you were in.",
      "We use them for one thing: emailing you about new cards, peanut guides and tips for eating out abroad. We don't sell the list and we don't share it.",
    ],
  },
  {
    id: "unsubscribe",
    heading: "Take yourself off the list",
    paragraphs: [
      "Enter your address and we delete it straight away. No questions.",
    ],
  },
  {
    heading: "Your cart",
    paragraphs: [
      "Your cart is saved in your own browser, on your device, so it's still there when you come back. We can't see it.",
    ],
  },
  {
    heading: "Counting visitors",
    paragraphs: [
      "We count visits with Cloudflare Web Analytics: which pages are read, roughly where visitors are, and how fast the pages load.",
      "It uses no cookies, doesn't follow you to other sites, and doesn't know who you are.",
    ],
  },
  {
    heading: "Cookies and ads",
    paragraphs: [
      "We set no tracking or advertising cookies, and there are no ad trackers on this site.",
    ],
  },
  {
    heading: "Where it's kept",
    paragraphs: [
      "The site and the email list are hosted by Cloudflare, a company based in the United States. Like any web host, Cloudflare handles your IP address to deliver the pages and block abuse, and keeps short-lived technical logs. We don't keep IP addresses ourselves.",
    ],
  },
  {
    heading: "Questions",
    paragraphs: [
      `Want a copy of what we hold about you, or have a question? Email ${CONTACT_EMAIL}.`,
    ],
  },
];
