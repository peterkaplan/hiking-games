/**
 * Shipping and refunds: what we promise, in one place. The product pages,
 * the cart and the terms read from here so the numbers can't drift apart.
 *
 * Decided by the owner on 2026-11-24: laminated cards post to the United
 * States only, postage is free, orders are posted within three business
 * days, and any order can be refunded within 14 days. Change LAST_UPDATED
 * when any of it changes.
 */

import { CONTACT_EMAIL } from "./contact";

export const SHIPPING_UPDATED = "24 November 2026";

/** Business days between an order and posting it. */
export const DISPATCH_DAYS = 3;

/** Days a customer has to ask for a refund. */
export const REFUND_DAYS = 14;

/** One line for the cart and other small places. */
export const shippingLine = "Free US shipping on laminated cards.";

/** One line for the product pages' Delivery note. */
export const deliveryNote = `The digital set is yours the moment you buy. Laminated cards post free within the United States, within ${DISPATCH_DAYS} business days. Not happy? You have ${REFUND_DAYS} days to ask for a refund.`;

export const shippingIntro =
  "Digital sets arrive straight away, anywhere in the world. Laminated cards post free within the United States.";

export interface ShippingSection {
  heading: string;
  /** For links from other pages, e.g. /shipping#refunds. */
  id: string;
  list?: readonly string[];
  paragraphs: readonly string[];
}

export const shippingSections: readonly ShippingSection[] = [
  {
    id: "digital",
    heading: "Digital sets",
    paragraphs: [
      "Your digital set is ready to download the moment you buy, wherever you are. There is nothing to post and nothing to pay for delivery.",
      "Every laminated order includes the digital set too, so you have your cards straight away while the printed ones are on their way.",
    ],
  },
  {
    id: "laminated",
    heading: "Laminated cards",
    paragraphs: ["We print and laminate your cards ourselves, to order."],
    list: [
      "Where we post: addresses in the United States.",
      "What it costs: nothing. Shipping is free.",
      `When we post: within ${DISPATCH_DAYS} business days of your order.`,
      "How long it takes: we post by USPS, which usually takes 2 to 5 business days after that.",
    ],
  },
  {
    id: "outside-us",
    heading: "Outside the United States",
    paragraphs: [
      "We don't post laminated cards abroad yet. The digital set works anywhere: keep the cards on your phone, or print the PDF and laminate it at a copy shop before you travel.",
    ],
  },
  {
    id: "in-a-hurry",
    heading: "Leaving soon?",
    paragraphs: [
      "If your trip is less than two weeks away, don't wait on the post. Choose the digital set, or order laminated and use the digital set that comes with it until your cards arrive.",
    ],
  },
  {
    id: "refunds",
    heading: "Refunds",
    paragraphs: [
      `If you're not happy with your order for any reason, email ${CONTACT_EMAIL} within ${REFUND_DAYS} days and we'll refund it in full. For laminated cards, the ${REFUND_DAYS} days start on the day they arrive. For digital sets, they start on the day you buy.`,
      "You don't need to send anything back. Refunds go to the card or account you paid with.",
    ],
  },
  {
    id: "problems",
    heading: "Lost, damaged or wrong",
    paragraphs: [
      `If your cards arrive damaged, aren't what you ordered, or haven't arrived 10 business days after we posted them, email ${CONTACT_EMAIL}. We'll send a replacement free, or refund you, whichever you prefer.`,
    ],
  },
  {
    id: "cancel",
    heading: "Changing or cancelling an order",
    paragraphs: [
      `Email ${CONTACT_EMAIL} as soon as you can. If we haven't posted your cards yet, we'll change or cancel the order straight away.`,
    ],
  },
];
