import type { Metadata } from "next";
import Link from "next/link";
import { JuliasCard } from "@/components/shop/sections";
import { story } from "@/content/story";

export const metadata: Metadata = {
  title: "Our story: made by Julia",
  description: `${story.heading} ${story.mission}`,
};

/*
 * Structure from the reference stores' story pages: a mission headline
 * (Allbirds, Great Jones), a journey in steps (Allbirds' timeline), a signed
 * note from the founder on a paper card (Ghia), named principles (Allbirds'
 * "Better Things / Better Ways", Graza's numbered list), and a way back to
 * the products (all of them).
 */

const sectionLabel = "font-mono text-xs tracking-[0.18em] uppercase";

const Hero = () => (
  <section className="mx-auto max-w-4xl px-4 pt-14 pb-16 text-center sm:px-6 lg:pt-20">
    <p className="bg-shop-highlight text-shop-on-highlight inline-block rounded-full px-3 py-1 font-mono text-xs uppercase">
      {story.eyebrow}
    </p>
    <h1 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">
      {story.heading}
    </h1>
    <p className="mx-auto mt-6 max-w-2xl text-xl">{story.mission}</p>
  </section>
);

const Journey = () => (
  <section
    aria-labelledby="journey-heading"
    className="mx-auto max-w-7xl px-4 sm:px-6"
  >
    <h2 className={sectionLabel} id="journey-heading">
      How it started
    </h2>
    <ol className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {story.journey.map((step, index) => (
        <li
          className="bg-shop-panel border-shop-ink flex flex-col rounded-[24px] border-2 p-6"
          key={step.title}
        >
          <p className="font-mono text-sm">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-serif text-2xl leading-tight">
            {step.title}
          </h3>
          <p className="mt-3">{step.body}</p>
        </li>
      ))}
    </ol>
  </section>
);

/** A signed note in Julia's voice, on a paper card (as on Ghia's page). */
const Note = () => (
  <section
    aria-labelledby="note-heading"
    className="mx-auto max-w-7xl px-4 pt-24 sm:px-6"
  >
    <div className="grid items-center gap-14 lg:grid-cols-2">
      <div className="relative">
        {story.note.approvedByJulia ? null : (
          <p className="bg-shop-ink text-shop-bg absolute -top-4 right-4 z-10 rounded-full px-3 py-1 font-mono text-xs uppercase">
            Draft: awaiting Julia&apos;s OK
          </p>
        )}
        <article className="bg-shop-highlight text-shop-on-highlight -rotate-1 rounded-md p-8 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)] sm:p-12">
          <h2 className="font-serif text-3xl" id="note-heading">
            {story.note.greeting}
          </h2>
          <div className="mt-5 space-y-4 text-lg">
            {story.note.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 font-serif text-3xl">{story.note.signOff}</p>
          <p className="mt-1 font-mono text-xs uppercase">{story.note.role}</p>
        </article>
      </div>
      <JuliasCard />
    </div>
  </section>
);

const Principles = () => (
  <section
    aria-labelledby="principles-heading"
    className="mx-auto max-w-7xl px-4 pt-24 sm:px-6"
  >
    <h2
      className="font-serif text-4xl tracking-tight sm:text-5xl"
      id="principles-heading"
    >
      What we believe
    </h2>
    <ol className="mt-10 grid gap-10 md:grid-cols-3">
      {story.principles.map((principle, index) => (
        <li className="border-shop-ink border-t-2 pt-6" key={principle.title}>
          <p className="font-mono text-sm">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-serif text-2xl leading-tight">
            {principle.title}
          </h3>
          <p className="mt-3 text-lg">{principle.body}</p>
        </li>
      ))}
    </ol>
  </section>
);

const BackToShop = () => (
  <section className="bg-shop-band text-shop-on-band mx-4 mt-24 rounded-[32px] sm:mx-6">
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
        The cards from the honeymoon, ready for your trip.
      </h2>
      <Link
        className="bg-shop-bg text-shop-ink hover:bg-shop-panel focus-visible:outline-shop-on-band mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold focus-visible:outline-3 focus-visible:outline-offset-4"
        href="/v2#destinations"
      >
        Shop by country <span aria-hidden="true">→</span>
      </Link>
    </div>
  </section>
);

const OurStoryPage = () => (
  <main>
    <Hero />
    <Journey />
    <Note />
    <Principles />
    <BackToShop />
  </main>
);

export default OurStoryPage;
