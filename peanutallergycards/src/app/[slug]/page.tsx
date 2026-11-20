import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/buy-box";
import { CardSurface, MissingCardSurface } from "@/components/card-face";
import type { GalleryView } from "@/components/card-gallery";
import { CardGallery } from "@/components/card-gallery";
import { ChefCardFace } from "@/components/chef-card";
import { EmergencyCardFace } from "@/components/emergency-card";
import { Faq } from "@/components/faq";
import { MealSteps } from "@/components/meal-steps";
import { PixelArt } from "@/components/pixel/pixel";
import { isFlagId, peanut } from "@/components/pixel/sprites";
import { WavingFlag } from "@/components/pixel/waving-flag";
import { StatusBadge } from "@/components/status-badge";
import type { Destination } from "@/content/cards";
import {
  assertValidContent,
  cardBacks,
  destinationState,
  destinations,
  findDestination,
  frontLanguages,
} from "@/content/cards";
import { faqItems } from "@/content/faq";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = () => {
  // Fail the build rather than publish a card with, say, the wrong
  // emergency number.
  assertValidContent();
  return destinations.map(({ slug }) => ({ slug }));
};

const mainLanguageName = (destination: Destination): string =>
  frontLanguages(destination)[0]?.name ?? "the local language";

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const destination = findDestination((await params).slug);
  if (!destination) {
    return {};
  }
  const language = mainLanguageName(destination);
  return {
    title: `${destination.country} peanut allergy cards (${language} and English)`,
    description: `${language} peanut allergy cards for ${destination.country}. Show the chef card, get a clear yes or no from the kitchen, and eat with confidence. The emergency card asks people to call ${destination.emergencyNumber}.`,
  };
};

const galleryViews = (destination: Destination): GalleryView[] => {
  const { chefCard, emergencyCard } = destination;
  const backs = cardBacks(destination);
  const language = mainLanguageName(destination);
  return [
    {
      id: "chef-front",
      label: `Chef · ${language}`,
      content: chefCard.front ? (
        <CardSurface lang={chefCard.front.language.code}>
          <ChefCardFace
            staffNotes={chefCard.staffNotes}
            text={chefCard.front.text}
          />
        </CardSurface>
      ) : (
        <MissingCardSurface />
      ),
    },
    {
      id: "chef-back",
      label: "Chef · English",
      content: (
        <CardSurface lang="en">
          <ChefCardFace text={backs.chef} />
        </CardSurface>
      ),
    },
    {
      id: "emergency-front",
      label: `Emergency · ${language}`,
      content: emergencyCard.front ? (
        <CardSurface lang={emergencyCard.front.language.code}>
          <EmergencyCardFace text={emergencyCard.front.text} />
        </CardSurface>
      ) : (
        <MissingCardSurface />
      ),
    },
    {
      id: "emergency-back",
      label: "Emergency · English",
      content: (
        <CardSurface lang="en">
          <EmergencyCardFace text={backs.emergency} />
        </CardSurface>
      ),
    },
  ];
};

const PreviewNotice = () => (
  <p className="px-frame bg-butter px-4 py-3">
    <strong className="font-pixel">Preview.</strong> These cards haven&apos;t
    been checked by a native speaker yet, so they aren&apos;t on sale.
    Don&apos;t rely on them.
  </p>
);

const DestinationPage = async ({ params }: PageProps) => {
  const destination = findDestination((await params).slug);
  if (!destination) {
    notFound();
  }
  const state = destinationState(destination);
  const language = mainLanguageName(destination);
  const staffLanguages = destination.chefCard.staffNotes.map(
    (note) => note.language.name
  );

  return (
    <main>
      <div className="bg-sky">
        <div className="mx-auto max-w-6xl px-4 pt-2 pb-16">
          <nav aria-label="Breadcrumb" className="font-pixel">
            <ol className="flex gap-2">
              <li>
                <Link className="px-focus hover:underline" href="/">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  className="px-focus hover:underline"
                  href="/#destinations"
                >
                  Destinations
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{destination.country}</li>
            </ol>
          </nav>

          {state === "ready" ? null : (
            <div className="mt-8">
              <PreviewNotice />
            </div>
          )}

          <div className="mt-12 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="lg:sticky lg:top-8">
                <CardGallery views={galleryViews(destination)} />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex items-center justify-between gap-4">
                {isFlagId(destination.slug) ? (
                  <WavingFlag className="size-20" id={destination.slug} />
                ) : null}
                <StatusBadge state={state} />
              </div>
              <h1 className="font-pixel mt-4 text-5xl sm:text-6xl">
                {destination.country}
              </h1>
              <p className="mt-3 text-xl">
                Peanut allergy cards in {language}, with English on the back.
                Show the card, get a clear yes or no from the kitchen, and eat
                with confidence.
              </p>

              <div className="mt-10">
                <BuyBox state={state} />
              </div>

              <h2 className="font-pixel mt-12 text-2xl">What&apos;s inside</h2>
              <ul className="mt-4 space-y-4">
                <li>
                  <strong className="font-pixel">Chef card.</strong> Tells the
                  kitchen exactly what you can&apos;t eat and asks for a clear
                  yes or no.
                  {staffLanguages.length > 0
                    ? ` Includes a short note in ${staffLanguages.join(" and ")} for kitchen staff.`
                    : ""}
                </li>
                <li>
                  <strong className="font-pixel">Emergency card.</strong> Asks
                  anyone nearby to call{" "}
                  <strong className="font-pixel">
                    {destination.emergencyNumber}
                  </strong>{" "}
                  for an ambulance.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {destination.peanutFoods.length > 0 ? (
        <section
          aria-labelledby="peanut-foods-heading"
          className="mx-auto max-w-6xl px-4 pt-20"
        >
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="font-pixel text-4xl" id="peanut-foods-heading">
                Where peanuts turn up in {destination.country}
              </h2>
              <p className="mt-4 text-xl">
                They can be hard to spot, so show the chef card every time you
                order.
              </p>
            </div>
            <ul className="space-y-5 lg:col-span-3">
              {destination.peanutFoods.map((food) => (
                <li
                  className="px-frame flex items-center gap-4 bg-white px-4 py-3"
                  key={food}
                >
                  <PixelArt className="w-4 shrink-0" rows={peanut} />
                  {food}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="how-heading"
        className="mx-auto max-w-6xl px-4 pt-20"
      >
        <h2 className="font-pixel text-4xl" id="how-heading">
          How a meal goes
        </h2>
        <div className="mt-10">
          <MealSteps />
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="mx-auto max-w-4xl px-4 pt-20"
      >
        <h2 className="font-pixel text-4xl" id="faq-heading">
          Questions
        </h2>
        <div className="mt-10">
          <Faq items={faqItems} />
        </div>
      </section>
    </main>
  );
};

export default DestinationPage;
