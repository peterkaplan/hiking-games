import type { Metadata } from "next";
import {
  TERMS_UPDATED,
  termsIntro,
  termsSections,
  termsSummary,
} from "@/content/terms";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The terms for using this website and buying our cards: what the cards do, what they can't promise, and how to use them.",
};

/*
 * A plain policy page, as on the reference stores: one narrow column, a
 * large serif title, the date, then numbered sections. The three points that
 * matter most sit in a panel above the full terms.
 */

const Summary = () => (
  <section
    aria-labelledby="terms-summary-heading"
    className="bg-shop-highlight text-shop-on-highlight mt-10 rounded-[28px] p-6 sm:p-8"
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
    <p className="font-mono text-xs tracking-[0.18em] uppercase">
      Last updated {TERMS_UPDATED}
    </p>
    <h1 className="mt-4 font-serif text-5xl tracking-tight sm:text-6xl">
      Terms of use
    </h1>
    <p className="mt-6 text-xl">{termsIntro}</p>
    <Summary />
    <ol className="border-shop-ink mt-14 border-b-2">
      {termsSections.map((section, index) => (
        <li
          className="border-shop-ink grid gap-x-8 gap-y-2 border-t-2 py-8 sm:grid-cols-[4rem_1fr]"
          key={section.heading}
        >
          <p
            aria-hidden="true"
            className="text-shop-cta font-serif text-4xl leading-none"
          >
            {String(index + 1).padStart(2, "0")}
          </p>
          <div>
            <h2 className="font-serif text-3xl leading-tight">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.list ? (
              <ul className="mt-4 list-disc space-y-2 pl-6">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  </main>
);

export default TermsPage;
