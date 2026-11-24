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
  EQUAL_EATS_PATH,
  equalEatsFaq,
  intro,
  metaDescription,
  metaTitle,
  PUBLISHED,
  pageTitle,
  UPDATED,
  verdicts,
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
 * The usual "us vs them" page: the short answer first, a table to scan, a
 * section for each thing people compare, the questions they search for, and
 * a way to the products. Our column is the highlighted one, as in the
 * product pages' comparison table.
 */

const verdictTones = [
  "bg-shop-band text-shop-on-band",
  "bg-shop-panel border-shop-ink border-2",
];

const ShortAnswer = () => (
  <section aria-labelledby="short-answer-heading" className="mt-14">
    <h2
      className="font-serif text-4xl tracking-tight sm:text-5xl"
      id="short-answer-heading"
    >
      The short answer
    </h2>
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {verdicts.map((verdict, index) => (
        <div
          className={`rounded-[28px] p-6 sm:p-8 ${verdictTones.at(index) ?? ""}`}
          key={verdict.heading}
        >
          <h3 className="font-serif text-2xl leading-tight sm:text-3xl">
            {verdict.heading}
          </h3>
          <ul className="mt-5 space-y-3">
            {verdict.points.map((point) => (
              <li className="flex gap-3" key={point}>
                <span aria-hidden="true">✦</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

const cell = "p-3 align-top text-sm sm:p-5 sm:text-lg";

const CompareTable = () => (
  <section aria-labelledby="table-heading" className="mt-24">
    <h2
      className="font-serif text-4xl tracking-tight sm:text-5xl"
      id="table-heading"
    >
      Side by side
    </h2>
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
              <td className={`bg-shop-selected ${cell}`}>{row.us}</td>
              <td className={cell}>{row.equalEats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="mt-4 text-base">
      Equal Eats&apos; details are from equaleats.com, checked on {CHECKED}.
      Prices in US dollars. Check their website for anything that may have
      changed.
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
          { name: pageTitle, path: EQUAL_EATS_PATH },
        ]),
        faqData(equalEatsFaq),
      ]}
    />
    <Eyebrow>Allergy translation cards compared · {CHECKED}</Eyebrow>
    <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-7xl">
      {pageTitle}
    </h1>
    <p className="mt-6 max-w-3xl text-xl">{intro}</p>
    <div className="mt-9 flex flex-wrap gap-4">
      <Link className={buttonPrimary} href="/#destinations">
        Shop by country
      </Link>
      <a className={buttonSecondary} href="#table-heading">
        See the comparison
      </a>
    </div>

    <ShortAnswer />
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
        </div>
      </section>
    ))}

    <section aria-labelledby="compare-faq-heading" className="mt-24">
      <h2
        className="font-serif text-4xl tracking-tight sm:text-5xl"
        id="compare-faq-heading"
      >
        Questions people ask
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
        One card. One question. A clear yes.
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
        Shop by country <span aria-hidden="true">→</span>
      </Link>
    </section>

    <p className="mt-10 max-w-3xl text-sm">
      Equal Eats is a trademark of its owner. We are not connected to Equal
      Eats, and they have not reviewed this page. If something here is out of
      date, tell us and we&apos;ll fix it.
    </p>
  </main>
);

export default EqualEatsPage;
