import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardFace, MissingCardFace } from "@/components/card-face";
import { ChefCardFace } from "@/components/chef-card";
import { Disclaimer } from "@/components/disclaimer";
import { EmergencyCardFace } from "@/components/emergency-card";
import {
  assertValidContent,
  cardBacks,
  destinations,
  findDestination,
  isReady,
} from "@/content/cards";

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

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const destination = findDestination((await params).slug);
  if (!destination) {
    return {};
  }
  return {
    title: `${destination.country} peanut allergy cards`,
    description: `Peanut allergy chef card and emergency card for ${destination.country}, with English on the back.`,
  };
};

const DraftNotice = () => (
  <p className="mt-6 rounded-lg border border-amber-400 bg-amber-50 p-4 text-amber-900">
    Draft: these cards haven&apos;t been checked by a native speaker yet.
    Don&apos;t rely on them.
  </p>
);

const DestinationPage = async ({ params }: PageProps) => {
  const destination = findDestination((await params).slug);
  if (!destination) {
    notFound();
  }
  const backs = cardBacks(destination);
  const { chefCard, emergencyCard } = destination;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Link className="text-sm underline" href="/">
        All destinations
      </Link>
      <h1 className="mt-4 text-4xl font-bold">
        {destination.country} peanut allergy cards
      </h1>
      {isReady(destination) ? null : <DraftNotice />}

      <section aria-labelledby="chef-card" className="mt-12">
        <h2 className="text-2xl font-semibold" id="chef-card">
          Chef card
        </h2>
        <p className="mt-1 text-stone-500">Hand this to restaurant staff.</p>
        <div className="mt-6 grid gap-8">
          {chefCard.front ? (
            <CardFace
              label={`Front: ${chefCard.front.language.name}`}
              lang={chefCard.front.language.code}
            >
              <ChefCardFace
                staffNotes={chefCard.staffNotes}
                text={chefCard.front.text}
              />
            </CardFace>
          ) : (
            <MissingCardFace label="Front" />
          )}
          <CardFace label="Back: English" lang="en">
            <ChefCardFace text={backs.chef} />
          </CardFace>
        </div>
      </section>

      <section aria-labelledby="emergency-card" className="mt-12">
        <h2 className="text-2xl font-semibold" id="emergency-card">
          Emergency card
        </h2>
        <p className="mt-1 text-stone-500">
          Show this to anyone nearby if you have a reaction.
        </p>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {emergencyCard.front ? (
            <CardFace
              label={`Front: ${emergencyCard.front.language.name}`}
              lang={emergencyCard.front.language.code}
            >
              <EmergencyCardFace text={emergencyCard.front.text} />
            </CardFace>
          ) : (
            <MissingCardFace label="Front" />
          )}
          <CardFace label="Back: English" lang="en">
            <EmergencyCardFace text={backs.emergency} />
          </CardFace>
        </div>
      </section>

      <Disclaimer />
    </main>
  );
};

export default DestinationPage;
