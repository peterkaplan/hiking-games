import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Photo } from "@/components/photo";
import { buttonPrimary, CheckIcon, Eyebrow } from "@/components/shop/bits";
import { ShopFaq } from "@/components/shop/sections";
import { productPath } from "@/content/catalogue";
import {
  articleData,
  breadcrumbData,
  faqData,
  pageMetadata,
  TOKYO_SHARE_IMAGE,
} from "@/content/seo";
import type { RestaurantVisit } from "@/content/tokyo-restaurants";
import {
  cardResult,
  journalOpening,
  kyotoVisit,
  PUBLISHED,
  routine,
  TOKYO_PATH,
  tokyoFaq,
  tokyoTitle,
  tokyoVisits,
  UPDATED,
  VISITED,
} from "@/content/tokyo-restaurants";
import kyotoSeishuan from "@/images/kyoto-seishuan.webp";
import tokyoGyuKaku from "@/images/tokyo-gyu-kaku.webp";
import tokyoKyushuJangara from "@/images/tokyo-kyushu-jangara.webp";
import tokyoPizzaKevelos from "@/images/tokyo-pizza-kevelos.webp";
import tokyoSukiya from "@/images/tokyo-sukiya.webp";

const DESCRIPTION =
  "A food journal from Tokyo with a peanut allergy: five restaurants that read our chef card and said yes, what we ordered, and how we asked.";

export const metadata: Metadata = pageMetadata({
  title: "Best Peanut-Free Restaurants in Tokyo",
  description: DESCRIPTION,
  path: TOKYO_PATH,
  shareTitle: tokyoTitle,
  shareDescription:
    "What we ordered, how good it was, and what each kitchen said to our card. Not peanut-free kitchens, so always show yours.",
  shareImage: TOKYO_SHARE_IMAGE,
});

const photos: Record<RestaurantVisit["id"], StaticImageData> = {
  "kyoto-seishuan": kyotoSeishuan,
  "tokyo-gyu-kaku": tokyoGyuKaku,
  "tokyo-kyushu-jangara": tokyoKyushuJangara,
  "tokyo-pizza-kevelos": tokyoPizzaKevelos,
  "tokyo-sukiya": tokyoSukiya,
};

const mapLink = (visit: RestaurantVisit): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${visit.name} ${visit.address ?? visit.area}`)}`;

const Visit = ({
  eager = false,
  label,
  visit,
}: {
  /** The first photo on the page: load it straight away. */
  eager?: boolean;
  /** "01", or "Kyoto" for the one outside Tokyo. */
  label: string;
  visit: RestaurantVisit;
}) => (
  <article
    className="border-shop-ink grid scroll-mt-28 items-start gap-6 border-t pt-10 sm:grid-cols-2 sm:gap-10"
    id={visit.id}
  >
    <Photo
      alt={visit.photoAlt}
      className="border-shop-ink aspect-square w-full rounded-[28px] border-2 object-cover"
      priority={eager}
      sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
      src={photos[visit.id]}
    />
    <div className="min-w-0">
      <Eyebrow>
        {label} · {visit.area}
      </Eyebrow>
      <h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
        {visit.name}
      </h2>
      <p className="mt-2 font-mono text-sm uppercase">{visit.kind}</p>
      <div className="mt-5 space-y-4">
        {visit.entry.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-5 font-mono text-sm uppercase">Order: {visit.order}</p>
      <p className="mt-3 flex items-start gap-2 font-semibold">
        <CheckIcon className="mt-1 size-5 shrink-0" />
        {cardResult}
      </p>
      {visit.note ? <p className="mt-4 text-base">{visit.note}</p> : null}
      {visit.address ? (
        <p className="mt-4 text-base">
          {visit.address}.{" "}
          <a
            className="font-semibold underline decoration-2 underline-offset-4"
            href={mapLink(visit)}
            rel="noopener noreferrer"
            target="_blank"
          >
            Find it on a map
            <span className="sr-only">: {visit.name} (opens in a new tab)</span>
          </a>
        </p>
      ) : null}
    </div>
  </article>
);

const TokyoRestaurantsPage = () => (
  <main className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:pt-14">
    <JsonLd
      data={[
        articleData({
          title: tokyoTitle,
          description: DESCRIPTION,
          path: TOKYO_PATH,
          published: PUBLISHED,
          updated: UPDATED,
        }),
        breadcrumbData([
          { name: "Home", path: "/" },
          { name: "Peanut-free restaurants in Tokyo", path: TOKYO_PATH },
        ]),
        faqData(tokyoFaq),
      ]}
    />
    <Eyebrow>A food journal · Tokyo, {VISITED}</Eyebrow>
    <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-7xl">
      {tokyoTitle}
    </h1>
    <div className="mt-6 max-w-2xl space-y-4 text-xl">
      {journalOpening.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>

    <nav aria-labelledby="glance-heading" className="mt-10 max-w-2xl">
      <h2
        className="font-mono text-xs tracking-[0.18em] uppercase"
        id="glance-heading"
      >
        In this journal
      </h2>
      <ul className="border-shop-ink mt-3 border-b">
        {[...tokyoVisits, kyotoVisit].map((visit) => (
          <li className="border-shop-ink border-t" key={visit.id}>
            <a
              className="focus-visible:outline-shop-ink flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3 hover:underline focus-visible:outline-3"
              href={`#${visit.id}`}
            >
              <span className="font-serif text-xl">{visit.name}</span>
              <span className="font-mono text-xs uppercase">
                {visit.area} · {visit.order}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>

    <div className="mt-14 space-y-12">
      {tokyoVisits.map((visit, index) => (
        <Visit
          eager={index === 0}
          key={visit.id}
          label={String(index + 1).padStart(2, "0")}
          visit={visit}
        />
      ))}
    </div>

    <section aria-labelledby="kyoto-heading" className="mt-24">
      <h2
        className="font-serif text-4xl tracking-tight sm:text-5xl"
        id="kyoto-heading"
      >
        One more, on a day in Kyoto
      </h2>
      <div className="mt-10">
        <Visit label="Kyoto" visit={kyotoVisit} />
      </div>
    </section>

    <section aria-labelledby="routine-heading" className="mt-24 max-w-3xl">
      <h2
        className="font-serif text-4xl tracking-tight sm:text-5xl"
        id="routine-heading"
      >
        {routine.heading}
      </h2>
      <ol className="mt-6 list-decimal space-y-3 pl-6">
        {routine.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="mt-6">
        <Link
          className="font-semibold underline decoration-2 underline-offset-4"
          href="/how-to-use-a-chef-card"
        >
          How to use a chef card, and what to do when the answer is no{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </p>
    </section>

    <section aria-labelledby="tokyo-faq-heading" className="mt-24">
      <h2
        className="font-serif text-4xl tracking-tight sm:text-5xl"
        id="tokyo-faq-heading"
      >
        Eating in Tokyo with a peanut allergy: your questions
      </h2>
      <div className="mt-8">
        <ShopFaq items={tokyoFaq} />
      </div>
    </section>

    <section
      aria-labelledby="card-heading"
      className="bg-shop-panel border-shop-ink mt-24 rounded-[28px] border-2 p-8 sm:p-12"
    >
      <h2
        className="font-serif text-4xl tracking-tight sm:text-5xl"
        id="card-heading"
      >
        The card that got every yes.
      </h2>
      <p className="mt-4 max-w-2xl">
        We handed the same card to the staff at every one of these, before we
        ordered. It tells the chef what we can&apos;t eat, in Japanese, and asks
        if they can cook for us.
      </p>
      <Link className={`${buttonPrimary} mt-8`} href={productPath("japan")}>
        See the Japanese cards <span aria-hidden="true">→</span>
      </Link>
    </section>
  </main>
);

export default TokyoRestaurantsPage;
