import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Photo } from "@/components/photo";
import { buttonPrimary, CheckIcon, Eyebrow } from "@/components/shop/bits";
import { productPath } from "@/content/catalogue";
import { articleData, breadcrumbData, pageMetadata } from "@/content/seo";
import type { RestaurantVisit } from "@/content/tokyo-restaurants";
import {
  cardResult,
  kyotoVisit,
  PUBLISHED,
  TOKYO_PATH,
  tokyoIntro,
  tokyoTitle,
  tokyoVisits,
  tokyoWarning,
  UPDATED,
  VISITED,
} from "@/content/tokyo-restaurants";
import kyotoSeishuan from "@/images/kyoto-seishuan.webp";
import tokyoGyuKaku from "@/images/tokyo-gyu-kaku.webp";
import tokyoKyushuJangara from "@/images/tokyo-kyushu-jangara.webp";
import tokyoPizzaKevelos from "@/images/tokyo-pizza-kevelos.webp";
import tokyoSukiya from "@/images/tokyo-sukiya.webp";

const DESCRIPTION =
  "Where we ate in Tokyo with a peanut allergy: four restaurants that read our chef card and said yes. Not peanut-free kitchens, so always show your card.";

export const metadata: Metadata = pageMetadata({
  title: "Best Peanut-Free Restaurants in Tokyo",
  description: DESCRIPTION,
  path: TOKYO_PATH,
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
  <article className="border-shop-ink grid items-center gap-6 border-t pt-10 sm:grid-cols-2 sm:gap-10">
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
      <p className="mt-5">{visit.ate}</p>
      <p className="mt-4 flex items-start gap-2 font-semibold">
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
      ]}
    />
    <Eyebrow>Tokyo · eaten in {VISITED}</Eyebrow>
    <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-7xl">
      {tokyoTitle}
    </h1>
    <p className="mt-6 max-w-2xl text-xl">{tokyoIntro}</p>
    <p className="bg-shop-highlight text-shop-on-highlight mt-8 max-w-3xl rounded-2xl px-5 py-4">
      <strong>Read this first.</strong> {tokyoWarning}
    </p>

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
