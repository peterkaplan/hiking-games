import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import type { Destination, TranslationState } from "@/content/cards";
import { destinationState, destinations } from "@/content/cards";

const stateLabel: Record<TranslationState, string> = {
  missing: "Coming soon",
  draft: "In review",
  "out-of-date": "Being updated",
  ready: "Available",
};

const DestinationRow = ({ destination }: { destination: Destination }) => (
  <li className="flex items-center justify-between border-b border-stone-300 py-3">
    <Link className="underline" href={`/${destination.slug}`}>
      {destination.country}
    </Link>
    <span className="text-sm">{stateLabel[destinationState(destination)]}</span>
  </li>
);

const Home = () => (
  <main className="mx-auto max-w-2xl px-4 py-16">
    <h1 className="text-4xl font-bold">Peanut Allergy Cards</h1>
    <p className="mt-4 text-lg">
      Two cards for each country you visit: a chef card for restaurants, and an
      emergency card in case of a reaction. The local language is on the front,
      English on the back.
    </p>
    <h2 className="mt-12 text-2xl font-semibold">Destinations</h2>
    <ul className="mt-4">
      {destinations.map((destination) => (
        <DestinationRow destination={destination} key={destination.slug} />
      ))}
    </ul>
    <Disclaimer />
  </main>
);

export default Home;
