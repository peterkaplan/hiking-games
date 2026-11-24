/**
 * What search engines and link previews are told about each page: the
 * address to index, the preview card, and structured data (schema.org).
 *
 * Nothing here is card text. Keep it true: no ratings or reviews until there
 * are real ones, and a price is only published once `isReady()` says the
 * destination's cards can be sold.
 */

import type { Metadata } from "next";
import type { Destination } from "./cards";
import { isReady } from "./cards";
import { productPath } from "./catalogue";
import type { FaqItem } from "./faq";
import { formats } from "./pricing";

export const SITE_URL = "https://peanutallergycards.com";
export const SITE_NAME = "Peanut Allergy Cards";

interface ShareImage {
  alt: string;
  height: number;
  url: string;
  width: number;
}

/**
 * The picture shown when a page is shared (1200 × 630, in public/). It is
 * a photo with no words on it: the title and the web address already appear
 * beside it in a message, so words in the picture only repeat them. Give a
 * changed picture a new file name: apps keep the old one by its address.
 */
const SHARE_IMAGE: ShareImage = {
  url: "/share.jpg",
  width: 1200,
  height: 630,
  alt: "A laminated Japanese peanut allergy card on a restaurant counter, beside a bowl of ramen",
};

/** For the Tokyo restaurants page. */
export const TOKYO_SHARE_IMAGE: ShareImage = {
  url: "/share-tokyo.jpg",
  width: 1200,
  height: 630,
  alt: "A wood-fired marinara pizza with tomato, garlic and basil",
};

const absolute = (path: string): string => `${SITE_URL}${path}`;

/**
 * Metadata for one page. `path` is the page's address on the site ("/" or
 * "/our-story"); it becomes the canonical URL, so the same page reached another
 * way (www, a trailing slash, the workers.dev address) counts as this one.
 *
 * A shared link shows the picture, a title and the web address together, so
 * the share title never repeats the site's name, and `shareTitle` and
 * `shareDescription` let a page say something there that the search title
 * doesn't already say.
 */
export const pageMetadata = ({
  description,
  path,
  shareDescription = description,
  shareImage = SHARE_IMAGE,
  shareTitle,
  title,
  titleIsComplete = false,
}: {
  description: string;
  path: string;
  /** The line under the title in a shared link. Defaults to `description`. */
  shareDescription?: string;
  shareImage?: ShareImage;
  /** The title in a shared link. Defaults to `title`. */
  shareTitle?: string;
  title: string;
  /** True when the title already reads well without the site name after it. */
  titleIsComplete?: boolean;
}): Metadata => {
  const shared = {
    title: shareTitle ?? title,
    description: shareDescription,
    images: [shareImage],
  };
  return {
    title: titleIsComplete ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      ...shared,
    },
    twitter: { card: "summary_large_image", ...shared },
  };
};

/* Structured data --------------------------------------------------------- */

export type StructuredData = Record<string, unknown>;

const ORGANIZATION_ID = absolute("/#organization");

export const organizationData: StructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: absolute("/"),
  logo: absolute("/apple-icon.png"),
};

export const websiteData: StructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absolute("/#website"),
  name: SITE_NAME,
  url: absolute("/"),
  inLanguage: "en",
  publisher: { "@id": ORGANIZATION_ID },
};

export const faqData = (items: readonly FaqItem[]): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
});

/** A guide or story we wrote, with the date it was last true. */
export const articleData = ({
  description,
  path,
  published,
  title,
  updated,
}: {
  description: string;
  path: string;
  /** ISO dates, e.g. "2026-11-24". */
  published: string;
  title: string;
  updated: string;
}): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": absolute(`${path}#article`),
  headline: title,
  description,
  url: absolute(path),
  image: absolute(SHARE_IMAGE.url),
  datePublished: published,
  dateModified: updated,
  author: { "@id": ORGANIZATION_ID },
  publisher: { "@id": ORGANIZATION_ID },
});

/** The trail of pages above this one, e.g. Home › Japan. */
export const breadcrumbData = (
  trail: readonly { name: string; path: string }[]
): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((step, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: step.name,
    item: absolute(step.path),
  })),
});

/**
 * A destination's set as a product. The price and "in stock" are only
 * included once the cards are really ready to sell.
 */
export const productData = ({
  description,
  destination,
  language,
}: {
  description: string;
  destination: Destination;
  language: string;
}): StructuredData => {
  const path = productPath(destination.slug);
  const prices = formats.map((format) => format.priceUsd);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absolute(`${path}#product`),
    name: `${language} Peanut Allergy Cards for ${destination.country}`,
    description,
    url: absolute(path),
    image: absolute(SHARE_IMAGE.url),
    brand: { "@type": "Brand", name: SITE_NAME },
    ...(isReady(destination)
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: formats.length,
            availability: "https://schema.org/InStock",
            url: absolute(path),
          },
        }
      : {}),
  };
};
