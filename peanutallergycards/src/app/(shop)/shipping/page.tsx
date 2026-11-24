import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import {
  SHIPPING_UPDATED,
  shippingIntro,
  shippingSections,
} from "@/content/shipping";

export const metadata: Metadata = pageMetadata({
  title: "Shipping and refunds",
  description:
    "Digital sets arrive straight away. Laminated cards post free within the United States. Refunds on any order within 14 days.",
  path: "/shipping",
});

/* Laid out like the privacy and terms pages, so the policy pages match. */
const ShippingPage = () => (
  <main className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:pt-14">
    <p className="font-mono text-xs tracking-widest uppercase">
      Last updated {SHIPPING_UPDATED}
    </p>
    <h1 className="mt-3 font-serif text-5xl tracking-tight sm:text-6xl">
      Shipping and refunds
    </h1>
    <p className="mt-6 text-xl">{shippingIntro}</p>

    {shippingSections.map((section) => (
      <section
        className="border-shop-ink mt-10 scroll-mt-28 border-t pt-8"
        id={section.id}
        key={section.id}
      >
        <h2 className="font-serif text-3xl">{section.heading}</h2>
        {section.paragraphs.map((paragraph) => (
          <p className="mt-4" key={paragraph}>
            {paragraph}
          </p>
        ))}
        {section.list ? (
          <ul className="mt-4 list-disc space-y-2 pl-6">
            {section.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </section>
    ))}
  </main>
);

export default ShippingPage;
