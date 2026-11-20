import type { CardLanguage, TranslationState } from "@/content/cards";
import { cardLanguages, translationState } from "@/content/cards";

const stateLabel: Record<TranslationState, string> = {
  missing: "Coming soon",
  draft: "In review",
  "out-of-date": "Being updated",
  ready: "Available",
};

const LanguageRow = ({ language }: { language: CardLanguage }) => (
  <li className="flex items-center justify-between border-b border-stone-300 py-3">
    <span>
      {language.name}{" "}
      <span className="text-stone-500" lang={language.code}>
        ({language.nativeName})
      </span>
    </span>
    <span className="text-sm">{stateLabel[translationState(language)]}</span>
  </li>
);

const Home = () => (
  <main className="mx-auto max-w-2xl px-4 py-16">
    <h1 className="text-4xl font-bold">Peanut Allergy Cards</h1>
    <p className="mt-4 text-lg">
      Show this card at restaurants so the kitchen knows about your peanut
      allergy, in their own language.
    </p>
    <h2 className="mt-12 text-2xl font-semibold">Languages</h2>
    <ul className="mt-4">
      {cardLanguages.map((language) => (
        <LanguageRow key={language.code} language={language} />
      ))}
    </ul>
    <p className="mt-12 text-sm text-stone-500">
      These cards help you communicate. They are not medical advice. Always
      carry your prescribed medication and follow your doctor&apos;s allergy
      plan.
    </p>
  </main>
);

export default Home;
