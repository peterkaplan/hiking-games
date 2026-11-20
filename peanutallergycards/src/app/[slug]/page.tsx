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
  frontLanguages(destination)[0]?.name ?? "Local language";

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
    description: `${language} peanut allergy chef card and emergency card for ${destination.country}, with English on the back. The emergency card asks people to call ${destination.emergencyNumber}.`,
  };
};

const galleryViews = (destination: Destination): GalleryView[] => {
  const { chefCard, emergencyCard } = destination;
  const backs = cardBacks(destination);
  const language = mainLanguageName(destination);
  return [
    {
      id: "chef-front",
      label: `Chef card · ${language}`,
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
      label: "Chef card · English",
      content: (
        <CardSurface lang="en">
          <ChefCardFace text={backs.chef} />
        </CardSurface>
      ),
    },
    {
      id: "emergency-front",
      label: `Emergency card · ${language}`,
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
      label: "Emergency card · English",
      content: (
        <CardSurface lang="en">
          <EmergencyCardFace text={backs.emergency} />
        </CardSurface>
      ),
    },
  ];
};

const usageTips = [
  {
    title: "Show it every time you order",
    body: "Hand the chef card to your server and ask for it to go to the kitchen, even for dishes you think are safe.",
  },
  {
    title: "Believe a “no”",
    body: "The card makes it easy for staff to say they can't be sure. If they do, thank them and eat somewhere else.",
  },
  {
    title: "Keep the emergency card close",
    body: "Keep it with your epinephrine, and save the phone image so it works without signal.",
  },
] as const;

const DraftNotice = () => (
  <p className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
    <strong>Preview.</strong> These cards haven&apos;t been checked by a native
    speaker yet, so they aren&apos;t on sale. Don&apos;t rely on them.
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
    <main className="mx-auto max-w-6xl px-4 pt-6">
      <nav aria-label="Breadcrumb" className="text-sm text-stone-600">
        <ol className="flex gap-2">
          <li>
            <Link className="hover:text-ink" href="/">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link className="hover:text-ink" href="/#destinations">
              Destinations
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {destination.country}
          </li>
        </ol>
      </nav>

      {state === "ready" ? null : (
        <div className="mt-6">
          <DraftNotice />
        </div>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-8">
            <CardGallery views={galleryViews(destination)} />
          </div>
        </div>

        <div className="lg:col-span-5">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-peanut-700 text-sm font-semibold tracking-widest uppercase">
                {language} + English
              </p>
              <StatusBadge state={state} />
            </div>
            <h1 className="font-display mt-3 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
              {destination.country} peanut allergy cards
            </h1>
            <p className="mt-4 text-lg text-stone-700">
              A chef card for restaurants and an emergency card in case you
              react. {language} on the front, English on the back.
            </p>

            <div className="mt-8">
              <BuyBox state={state} />
            </div>

            <h2 className="mt-8 font-semibold">What&apos;s included</h2>
            <ul className="mt-3 space-y-3 text-stone-700">
              <li>
                <strong className="text-ink">Chef card.</strong> Tells
                restaurant staff the allergy can kill and how to cook safely.
                {staffLanguages.length > 0
                  ? ` Includes a short note in ${staffLanguages.join(" and ")} for kitchen staff.`
                  : ""}
              </li>
              <li>
                <strong className="text-ink">Emergency card.</strong> Asks
                anyone nearby to call{" "}
                <strong className="text-ink">
                  {destination.emergencyNumber}
                </strong>{" "}
                for an ambulance.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {destination.peanutFoods.length > 0 ? (
        <section
          aria-labelledby="peanut-foods-heading"
          className="bg-peanut-100/60 mt-24 grid gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-5"
        >
          <div className="lg:col-span-2">
            <h2
              className="font-display text-3xl font-bold tracking-tight"
              id="peanut-foods-heading"
            >
              Where peanuts turn up in {destination.country}
            </h2>
            <p className="mt-3 text-stone-700">
              Peanuts can be hard to spot, so show the chef card every time you
              order.
            </p>
          </div>
          <ul className="space-y-3 lg:col-span-3">
            {destination.peanutFoods.map((food) => (
              <li
                className="rounded-xl bg-white px-4 py-3 shadow-sm"
                key={food}
              >
                {food}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="usage-heading" className="mt-24">
        <h2
          className="font-display text-3xl font-bold tracking-tight"
          id="usage-heading"
        >
          How to use your cards
        </h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {usageTips.map((tip, index) => (
            <li key={tip.title}>
              <span className="bg-ink font-display flex size-10 items-center justify-center rounded-full font-bold text-white">
                {index + 1}
              </span>
              <h3 className="font-display mt-4 text-xl font-bold">
                {tip.title}
              </h3>
              <p className="mt-2 text-stone-700">{tip.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="faq-heading" className="mt-24 max-w-4xl">
        <h2
          className="font-display text-3xl font-bold tracking-tight"
          id="faq-heading"
        >
          Questions
        </h2>
        <div className="mt-8">
          <Faq items={faqItems} />
        </div>
      </section>
    </main>
  );
};

export default DestinationPage;
