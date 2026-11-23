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
import type { FaqItem } from "./faq";
import { formats } from "./pricing";

export const SITE_URL = "https://peanutallergycards.com";
export const SITE_NAME = "Peanut Allergy Cards";

/** The picture shown when a page is shared (1200 × 630, in public/). */
const SHARE_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "A laminated Japanese peanut allergy card beside a bowl of ramen, with the words: Eat in restaurants abroad with confidence.",
};

const absolute = (path: string): string => `${SITE_URL}${path}`;

/**
 * Metadata for one page. `path` is the page's address on the site ("/" or
 * "/japan"); it becomes the canonical URL, so the same page reached another
 * way (www, a trailing slash, the workers.dev address) counts as this one.
 */
export const pageMetadata = ({
  description,
  path,
  title,
  titleIsComplete = false,
}: {
  description: string;
  path: string;
  title: string;
  /** True when the title already reads well without the site name after it. */
  titleIsComplete?: boolean;
}): Metadata => {
  const shareTitle = titleIsComplete ? title : `${title} | ${SITE_NAME}`;
  return {
    title: titleIsComplete ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: shareTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [SHARE_IMAGE],
    },
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
  const path = `/${destination.slug}`;
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
