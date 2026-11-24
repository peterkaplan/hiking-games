import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import {
  buttonPrimary,
  buttonSecondary,
  CheckIcon,
  Eyebrow,
} from "@/components/shop/bits";
import { ShopFaq } from "@/components/shop/sections";
import {
  CHECKED,
  compareRows,
  compareSections,
  crumbTitle,
  EQUAL_EATS_PATH,
  equalEatsFaq,
  intro,
  metaDescription,
  metaTitle,
  PUBLISHED,
  pageTitle,
  UPDATED,
  verdict,
  winsForUs,
} from "@/content/equal-eats";
import {
  articleData,
  breadcrumbData,
  faqData,
  pageMetadata,
} from "@/content/seo";

export const metadata: Metadata = pageMetadata({
  title: metaTitle,
  titleIsComplete: true,
  description: metaDescription,
  path: EQUAL_EATS_PATH,
});

/*
 * The usual "alternative to" page: our verdict first, a table to scan, a
 * section for each thing people compare, the questions they search for, and
 * a way to the products. Our column is the highlighted one, as in the
 * product pages' comparison table.
 */

const Verdict = () => (
  <section
    aria-labelledby="verdict-heading"
    className="bg-shop-band text-shop-on-band mt-14 rounded-[28px] p-6 sm:p-10"
  >
    <h2
      className="text-shop-highlight font-mono text-xs tracking-[0.18em] uppercase"
      id="verdict-heading"
    >
      {verdict.heading}
    </h2>
    <p className="mt-4 max-w-3xl font-serif text-2xl leading-snug sm:text-3xl">
      {verdict.body}
    </p>
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {verdict.points.map((point) => (
        <li className="flex gap-3" key={point}>
          <span aria-hidden="true" className="text-shop-highlight">
            ✦
          </span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
    <Link
      className="bg-shop-bg text-shop-ink hover:bg-shop-panel focus-visible:outline-shop-on-band mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold focus-visible:outline-3 focus-visible:outline-offset-4"
      href="/#destinations"
    >
      Shop peanut allergy cards <span aria-hidden="true">→</span>
    </Link>
  </section>
);

/** A small tag on the cell that comes out ahead. */
const Edge = () => (
  <span className="bg-shop-ink text-shop-bg mb-2 block w-fit rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase sm:text-xs">
    Better
  </span>
);

const cell = "p-3 align-top text-sm sm:p-5 sm:text-lg";

const CompareTable = () => (
  <section aria-labelledby="table-heading" className="mt-24">
    <h2
      className="font-serif text-4xl tracking-tight sm:text-5xl"
      id="table-heading"
    >
      Equal Eats vs Peanut Allergy Cards, side by side
    </h2>
    <p className="mt-4 max-w-3xl">
      For a traveller with a peanut allergy, Peanut Allergy Cards comes out
      ahead on {winsForUs} of {compareRows.length} points.
    </p>
    <div className="border-shop-ink bg-shop-panel mt-8 overflow-hidden rounded-[24px] border-2">
      <table className="w-full table-fixed border-collapse text-left">
        <caption className="sr-only">
          Peanut Allergy Cards compared with Equal Eats
        </caption>
        <colgroup>
          <col className="w-[26%]" />
          <col className="w-[37%]" />
          <col className="w-[37%]" />
        </colgroup>
        <thead>
          <tr className="border-shop-ink border-b-2">
            <th className="p-3 font-normal sm:p-5" scope="col">
              <span className="sr-only">What we compared</span>
            </th>
            <th
              className="bg-shop-selected p-3 font-serif text-base leading-tight sm:p-5 sm:text-xl"
              scope="col"
            >
              Peanut Allergy Cards
            </th>
            <th
              className="p-3 font-serif text-base leading-tight sm:p-5 sm:text-xl"
              scope="col"
            >
              Equal Eats
            </th>
          </tr>
        </thead>
        <tbody>
          {compareRows.map((row) => (
            <tr
              className="border-shop-ink border-b last:border-b-0"
              key={row.feature}
            >
              <th
                className="p-3 align-top font-mono text-[11px] font-normal tracking-wide uppercase sm:p-5 sm:text-sm"
                scope="row"
              >
                {row.feature}
              </th>
              <td className={`bg-shop-selected ${cell}`}>
                {row.edge === "us" ? <Edge /> : null}
                {row.us}
              </td>
              <td className={cell}>
                {row.edge === "them" ? <Edge /> : null}
                {row.equalEats}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="mt-4 text-base">
      Equal Eats&apos; details are from equaleats.com, checked on {CHECKED}.
      Prices in US dollars. “Better” is our view, for a traveller with a peanut
      allergy.
    </p>
  </section>
);

const EqualEatsPage = () => (
  <main className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:pt-14">
    <JsonLd
      data={[
        articleData({
          title: pageTitle,
          description: metaDescription,
          path: EQUAL_EATS_PATH,
          published: PUBLISHED,
          updated: UPDATED,
        }),
        breadcrumbData([
          { name: "Home", path: "/" },
          { name: crumbTitle, path: EQUAL_EATS_PATH },
        ]),
        faqData(equalEatsFaq),
      ]}
    />
    <Eyebrow>Peanut allergy translation cards compared · {CHECKED}</Eyebrow>
    <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl">
      {pageTitle}
    </h1>
    <p className="mt-6 max-w-3xl text-xl">{intro}</p>
    <div className="mt-9 flex flex-wrap gap-4">
      <Link className={buttonPrimary} href="/#destinations">
        Shop peanut allergy cards
      </Link>
      <a className={buttonSecondary} href="#table-heading">
        See the comparison
      </a>
    </div>

    <Verdict />
    <CompareTable />

    {compareSections.map((section) => (
      <section
        aria-labelledby={`${section.id}-heading`}
        className="mt-20 scroll-mt-28"
        id={section.id}
        key={section.id}
      >
        <h2
          className="max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl"
          id={`${section.id}-heading`}
        >
          {section.heading}
        </h2>
        <div className="mt-6 max-w-3xl space-y-4">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.link ? (
            <p>
              <Link
                className="font-semibold underline decoration-2 underline-offset-4"
                href={section.link.href}
              >
                {section.link.label} <span aria-hidden="true">→</span>
              </Link>
            </p>
          ) : null}
        </div>
      </section>
    ))}

    <section aria-labelledby="compare-faq-heading" className="mt-24">
      <h2
        className="font-serif text-4xl tracking-tight sm:text-5xl"
        id="compare-faq-heading"
      >
        Equal Eats alternative: questions people ask
      </h2>
      <div className="mt-8">
        <ShopFaq items={equalEatsFaq} />
      </div>
    </section>

    <section
      aria-labelledby="compare-cta-heading"
      className="bg-shop-highlight text-shop-on-highlight mt-24 rounded-[28px] p-8 sm:p-12"
    >
      <h2
        className="font-serif text-4xl tracking-tight sm:text-5xl"
        id="compare-cta-heading"
      >
        The peanut allergy card written for where you&apos;re eating.
      </h2>
      <ul className="mt-6 space-y-2">
        {[
          "Chef card, emergency card and local peanut guide",
          "Written for the country's kitchens",
          "On your phone in minutes",
        ].map((point) => (
          <li className="flex items-center gap-3" key={point}>
            <CheckIcon className="size-5 shrink-0" />
            {point}
          </li>
        ))}
      </ul>
      <Link className={`${buttonPrimary} mt-8`} href="/#destinations">
        Shop peanut allergy cards <span aria-hidden="true">→</span>
      </Link>
    </section>

    <p className="mt-10 max-w-3xl text-sm">
      Equal Eats is a trademark of its owner. We are not connected to Equal
      Eats. Their details are from their own website on the date shown.
    </p>
  </main>
);

export default EqualEatsPage;
