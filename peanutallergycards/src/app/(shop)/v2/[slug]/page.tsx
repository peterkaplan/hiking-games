import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon } from "@/components/shop/bits";
import type { GallerySlide } from "@/components/shop/product-gallery";
import { ProductGallery } from "@/components/shop/product-gallery";
import {
  CardSetShot,
  ChefBackCard,
  ChefFrontCard,
  destinationTint,
  EmergencyBackCard,
  EmergencyFrontCard,
  PhoneShot,
} from "@/components/shop/product-shots";
import {
  ComparisonTable,
  HowItWorks,
  PlaceholderReviews,
  ProductTile,
  ShopFaq,
} from "@/components/shop/sections";
import { BUY_BUTTON_ID, ShopBuyBox } from "@/components/shop/shop-buy-box";
import { StickyBuyBar } from "@/components/shop/sticky-buy-bar";
import { stateLabel } from "@/components/status-badge";
import type { Destination } from "@/content/cards";
import {
  assertValidContent,
  destinationState,
  destinations,
  findDestination,
  frontLanguages,
} from "@/content/cards";
import { faqItems } from "@/content/faq";
import { formatPrice, lowestPriceUsd } from "@/content/pricing";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = () => {
  assertValidContent();
  return destinations.map(({ slug }) => ({ slug }));
};

const languageName = (destination: Destination): string =>
  frontLanguages(destination)[0]?.name ?? "the local language";

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const destination = findDestination((await params).slug);
  if (!destination) {
    return {};
  }
  const language = languageName(destination);
  return {
    title: `${language} Peanut Allergy Card for ${destination.country}: Chef Card + Emergency Card`,
    description: `Show it before you order: a ${language} chef card that asks the kitchen for a clear yes or no, plus an emergency card with ${destination.country}'s ambulance number (${destination.emergencyNumber}). English on the back. Checked by a native speaker.`,
  };
};

const slidesFor = (destination: Destination): GallerySlide[] => {
  const language = languageName(destination);
  const tint = destinationTint(destination.slug);
  const slides: GallerySlide[] = [
    {
      id: "set",
      label: "The set: chef card and emergency card",
      backdrop: tint,
      content: <CardSetShot destination={destination} />,
    },
  ];
  if (destination.chefCard.front) {
    slides.push({
      id: "chef-front",
      label: `Chef card, front (${language})`,
      backdrop: "bg-shop-backdrop-3",
      content: <ChefFrontCard destination={destination} />,
    });
  }
  slides.push({
    id: "chef-back",
    label: "Chef card, back (English)",
    backdrop: "bg-shop-backdrop-3",
    content: <ChefBackCard destination={destination} />,
  });
  if (destination.emergencyCard.front) {
    slides.push({
      id: "emergency-front",
      label: `Emergency card, front (${language})`,
      backdrop: "bg-shop-backdrop-2",
      content: <EmergencyFrontCard destination={destination} />,
    });
  }
  slides.push(
    {
      id: "emergency-back",
      label: "Emergency card, back (English)",
      backdrop: "bg-shop-backdrop-2",
      content: <EmergencyBackCard destination={destination} />,
    },
    {
      id: "phone",
      label: "Digital: saved to your phone",
      backdrop: "bg-shop-backdrop-2",
      content: <PhoneShot destination={destination} />,
    }
  );
  return slides;
};

const Accordion = ({
  children,
  open = false,
  title,
}: {
  children: string;
  open?: boolean;
  title: string;
}) => (
  <details className="group border-shop-ink border-b" open={open}>
    <summary className="focus-visible:outline-shop-ink flex cursor-pointer list-none items-center justify-between py-4 font-semibold focus-visible:outline-3">
      {title}
      <span
        aria-hidden="true"
        className="font-mono text-xl transition group-open:rotate-45"
      >
        +
      </span>
    </summary>
    <p className="text-shop-ink pb-5 text-base">{children}</p>
  </details>
);

const ProductPage = async ({ params }: PageProps) => {
  const destination = findDestination((await params).slug);
  if (!destination) {
    notFound();
  }
  const state = destinationState(destination);
  const language = languageName(destination);
  const title = `The ${destination.country} Set`;
  const others = destinations.filter(
    (other) => other.slug !== destination.slug
  );

  return (
    <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <nav
        aria-label="Breadcrumb"
        className="text-shop-ink hidden font-mono text-xs uppercase sm:block"
      >
        <ol className="flex gap-2">
          <li>
            <Link className="hover:underline" href="/v2">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link className="hover:underline" href="/v2#destinations">
              Destinations
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{destination.country}</li>
        </ol>
      </nav>

      {state === "ready" ? null : (
        <p className="bg-shop-highlight text-shop-on-highlight rounded-2xl px-4 py-2 text-sm sm:mt-5 sm:px-5 sm:py-3 sm:text-base">
          <strong>Preview:</strong> not yet checked by a native speaker, so not
          on sale.
        </p>
      )}

      <div className="mt-4 grid gap-6 sm:mt-8 sm:gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <div className="lg:sticky lg:top-24">
            <ProductGallery slides={slidesFor(destination)} />
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <p className="border-shop-ink hidden rounded-full border px-3 py-1 font-mono text-xs uppercase sm:inline-block">
            {stateLabel[state]}
          </p>
          <h1 className="font-serif text-4xl leading-[1.02] tracking-tight sm:mt-4 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-2 font-mono text-sm uppercase">
            Peanut allergy chef card + emergency card · {language} and English
          </p>
          <p className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-serif text-3xl">
              From {formatPrice(lowestPriceUsd)}
            </span>
            <span className="text-shop-ink font-mono text-sm">
              No reviews yet
            </span>
          </p>
          <p className="text-shop-ink mt-5 text-xl">
            A chef card and an emergency card in {language}, with English on the
            back. Show it before you order, get a clear yes or no, and eat with
            confidence.
          </p>
          <h2 className="mt-6 font-semibold">Why it works</h2>
          <ul className="mt-3 space-y-2.5">
            {[
              "Spells out peanut, peanut oil, sauces and shared cookware",
              "Asks the kitchen for a clear yes or no",
              `Emergency card asks people to call ${destination.emergencyNumber}`,
            ].map((point) => (
              <li className="flex gap-3" key={point}>
                <CheckIcon className="mt-1 size-5 shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <ShopBuyBox state={state} />
          </div>

          <div className="mt-6">
            <Accordion open title="What's inside">
              {`Chef card and emergency card for ${destination.country}. ${language} on the front, English on the back. Digital: a print-ready PDF and phone-sized images. Printed: both cards laminated and posted to you, plus the digital files.`}
            </Accordion>
            <Accordion title="Details">
              {`Includes: 1 chef card and 1 emergency card. Languages: ${language} on the front, English on the back. Emergency number: ${destination.emergencyNumber} (${destination.country}). Card size: to be confirmed. Printed cards are laminated and wipe-clean.`}
            </Accordion>
            <Accordion title="Delivery">
              Digital: your download link arrives straight after you buy.
              Printed: posted to you, with the digital files sent straight away.
              Shipping times and costs to be confirmed.
            </Accordion>
            <Accordion title="How to use them">
              Hand the chef card over before you order and ask for it to go to
              the kitchen. If they say no or hesitate, eat somewhere else. Keep
              the emergency card with your epinephrine.
            </Accordion>
            <Accordion title="How we check translations">
              Every card is translated from our English text and checked by a
              native speaker before we sell it.
            </Accordion>
          </div>
        </div>
      </div>

      {/* One card, two languages: the explainer section. */}
      <section aria-labelledby="two-sides-heading" className="pt-28">
        <h2
          className="text-center font-serif text-4xl sm:text-6xl"
          id="two-sides-heading"
        >
          One card, two sides
        </h2>
        <p className="text-shop-ink mx-auto mt-4 max-w-xl text-center text-xl">
          The kitchen reads {language}. You read English. Nothing gets lost.
        </p>
        <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
          <figure>
            <p className="mb-4 text-center font-mono text-xs tracking-widest uppercase">
              Front · for the kitchen
            </p>
            <div
              className={`${destinationTint(destination.slug)} rounded-[28px] p-6 sm:p-10`}
            >
              {destination.chefCard.front ? (
                <ChefFrontCard destination={destination} />
              ) : (
                <EmergencyFrontCard destination={destination} />
              )}
            </div>
          </figure>
          <figure>
            <p className="mb-4 text-center font-mono text-xs tracking-widest uppercase">
              Back · for you
            </p>
            <div className="bg-shop-backdrop-3 rounded-[28px] p-6 sm:p-10">
              {destination.chefCard.front ? (
                <ChefBackCard destination={destination} />
              ) : (
                <EmergencyBackCard destination={destination} />
              )}
            </div>
          </figure>
        </div>
      </section>

      {destination.peanutFoods.length > 0 ? (
        <section aria-labelledby="foods-heading" className="pt-28">
          <div className="bg-shop-band text-shop-on-band rounded-[32px] px-6 py-14 sm:px-12">
            <h2 className="font-serif text-4xl sm:text-5xl" id="foods-heading">
              Where peanuts hide in {destination.country}
            </h2>
            <ul className="mt-10 flex flex-wrap gap-3">
              {destination.peanutFoods.map((food) => (
                <li
                  className="border-shop-on-band rounded-full border px-5 py-2.5 text-base"
                  key={food}
                >
                  {food}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="how-heading" className="pt-28">
        <h2 className="font-serif text-4xl sm:text-5xl" id="how-heading">
          How a meal goes
        </h2>
        <div className="mt-10">
          <HowItWorks />
        </div>
      </section>

      <section
        aria-labelledby="compare-heading"
        className="mx-auto max-w-5xl pt-28"
      >
        <h2
          className="text-center font-serif text-4xl sm:text-5xl"
          id="compare-heading"
        >
          Why not just use an app?
        </h2>
        <div className="mt-10">
          <ComparisonTable />
        </div>
      </section>

      <section aria-labelledby="reviews-heading" className="pt-28">
        <h2 className="font-serif text-4xl sm:text-5xl" id="reviews-heading">
          Reviews
        </h2>
        <div className="mt-6">
          <PlaceholderReviews />
        </div>
      </section>

      {others.length > 0 ? (
        <section aria-labelledby="more-heading" className="pt-28">
          <h2 className="font-serif text-4xl sm:text-5xl" id="more-heading">
            Going somewhere else too?
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <ProductTile destination={other} key={other.slug} />
            ))}
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="faq-heading"
        className="mx-auto max-w-4xl pt-28"
      >
        <h2 className="font-serif text-4xl sm:text-5xl" id="faq-heading">
          Questions
        </h2>
        <div className="mt-8">
          <ShopFaq items={faqItems} />
        </div>
      </section>

      <StickyBuyBar
        buyButtonId={BUY_BUTTON_ID}
        priceLabel={`From ${formatPrice(lowestPriceUsd)}`}
        title={title}
      />
    </main>
  );
};

export default ProductPage;
