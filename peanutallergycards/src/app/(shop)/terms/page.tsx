import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import {
  TERMS_UPDATED,
  termsIntro,
  termsSections,
  termsSummary,
} from "@/content/terms";

export const metadata: Metadata = pageMetadata({
  title: "Terms of use",
  description:
    "The terms for using this website and buying our cards: what the cards do, what they can't promise, and how to use them.",
  path: "/terms",
});

/*
 * Laid out like the privacy page, so the policy pages match. The three
 * points that matter most sit in a panel above the full terms.
 */

const Summary = () => (
  <section
    aria-labelledby="terms-summary-heading"
    className="bg-shop-highlight text-shop-on-highlight mt-10 mb-4 rounded-[28px] p-6 sm:p-8"
  >
    <h2
      className="font-mono text-xs tracking-[0.18em] uppercase"
      id="terms-summary-heading"
    >
      The short version
    </h2>
    <ul className="mt-4 space-y-3 text-xl">
      {termsSummary.map((point) => (
        <li className="flex gap-3" key={point}>
          <span aria-hidden="true">✦</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </section>
);

const TermsPage = () => (
  <main className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:pt-14">
    <p className="font-mono text-xs tracking-widest uppercase">
      Last updated {TERMS_UPDATED}
    </p>
    <h1 className="mt-3 font-serif text-5xl tracking-tight sm:text-6xl">
      Terms of use
    </h1>
    <p className="mt-6 text-xl">{termsIntro}</p>
    <Summary />
    {termsSections.map((section) => (
      <section
        className="border-shop-ink mt-10 border-t pt-8"
        key={section.heading}
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

export default TermsPage;
