import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buttonPrimary, Eyebrow } from "@/components/shop/bits";
import { ShopFaq } from "@/components/shop/sections";
import {
  CHEF_CARD_PATH,
  guideFaq,
  guideIntro,
  guideSections,
  guideTitle,
  guideWarning,
  metaDescription,
  metaTitle,
  PUBLISHED,
  UPDATED,
} from "@/content/chef-card-guide";
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
  path: CHEF_CARD_PATH,
});

const ChefCardGuidePage = () => (
  <main className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:pt-14">
    <JsonLd
      data={[
        articleData({
          title: guideTitle,
          description: metaDescription,
          path: CHEF_CARD_PATH,
          published: PUBLISHED,
          updated: UPDATED,
        }),
        breadcrumbData([
          { name: "Home", path: "/" },
          { name: "How to use a chef card", path: CHEF_CARD_PATH },
        ]),
        faqData(guideFaq),
      ]}
    />
    <Eyebrow>Guide · eating out abroad with a peanut allergy</Eyebrow>
    <h1 className="mt-3 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
      {guideTitle}
    </h1>
    <p className="mt-6 text-xl">{guideIntro}</p>
    <p className="bg-shop-highlight text-shop-on-highlight mt-8 rounded-2xl px-5 py-4">
      <strong>Read this first.</strong> {guideWarning}
    </p>

    {guideSections.map((section) => (
      <section
        aria-labelledby={`${section.id}-heading`}
        className="border-shop-ink mt-12 scroll-mt-28 border-t pt-8"
        id={section.id}
        key={section.id}
      >
        <h2
          className="font-serif text-3xl leading-tight sm:text-4xl"
          id={`${section.id}-heading`}
        >
          {section.heading}
        </h2>
        {section.paragraphs.map((paragraph) => (
          <p className="mt-4" key={paragraph}>
            {paragraph}
          </p>
        ))}
        {section.list ? (
          <ol className="mt-4 list-decimal space-y-3 pl-6">
            {section.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        ) : null}
      </section>
    ))}

    <section aria-labelledby="guide-faq-heading" className="mt-16">
      <h2
        className="font-serif text-3xl leading-tight sm:text-4xl"
        id="guide-faq-heading"
      >
        Chef card questions
      </h2>
      <div className="mt-6">
        <ShopFaq items={guideFaq} />
      </div>
    </section>

    <section
      aria-labelledby="guide-cta-heading"
      className="bg-shop-band text-shop-on-band mt-16 rounded-[28px] p-8 sm:p-10"
    >
      <h2
        className="font-serif text-3xl leading-tight sm:text-4xl"
        id="guide-cta-heading"
      >
        A chef card written for where you&apos;re eating.
      </h2>
      <p className="mt-4">
        Our peanut allergy cards come as a set: a chef card that asks the
        kitchen for a clear yes or no, an emergency card with the local
        ambulance number, and a guide to where peanuts hide.
      </p>
      <Link
        className={`${buttonPrimary} mt-6 shadow-none hover:shadow-none`}
        href="/#destinations"
      >
        Shop peanut allergy cards <span aria-hidden="true">→</span>
      </Link>
    </section>
  </main>
);

export default ChefCardGuidePage;
