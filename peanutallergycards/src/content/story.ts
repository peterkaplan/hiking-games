/**
 * Julia's story: a teaser on the store homepage and a full "Our story" page
 * (structure modelled on Ghia, Allbirds and Graza: mission headline, a
 * journey in steps, a signed note from the founder, named principles).
 *
 * Facts from the owners:
 * - Julia has been allergic to peanuts her whole life; the trip was their
 *   honeymoon in Thailand and Japan (2026-11-21).
 * - Peter, her fiancé, made her the cards so she could feel safe eating.
 *   They worked, and now she wants to share them with everyone (2026-11-21).
 *
 * Filled in by us and still to confirm with Julia:
 * - that Peter made them before the trip, while they were engaged;
 * - "read every label, ask every server" as her routine at home;
 * - that the cards "came to every meal";
 * - the exact wording of the note below, which is in her voice.
 * The Thailand food details come from our own "where peanuts hide" list.
 */

/** A note in Julia's voice. */
export interface FounderNote {
  /** Show the note as final only once Julia has approved the wording. */
  approvedByJulia: boolean;
  greeting: string;
  paragraphs: readonly string[];
  role: string;
  signOff: string;
}

const note: FounderNote = {
  approvedByJulia: false,
  greeting: "Hi, I'm Julia.",
  paragraphs: [
    "I've been allergic to peanuts my whole life, so eating out has always meant asking a lot of questions. That works at home. In a restaurant in Thailand or Japan, where I can't read the menu or speak to the chef, it doesn't.",
    "Before our honeymoon, my fiancé Peter made me two cards so I could feel safe when I was eating. One asked the kitchen, in their own language, whether they could cook for me. The other was for an emergency.",
    "They worked. I handed one to the waiter at every restaurant, got a straight answer every time, and ate things I would never have risked.",
    "Now I want to share them with everyone else.",
  ],
  signOff: "Julia",
  role: "Founder, Peanut Allergy Cards",
};

export const story = {
  eyebrow: "Our story",
  heading: "Made by Peter, for Julia. Now for you.",
  mission:
    "Julia has been allergic to peanuts her whole life. Her fiancé made her these cards so she could eat abroad and feel safe. They worked.",

  /** Homepage teaser. */
  teaser:
    "Julia has been allergic to peanuts her whole life. Before their honeymoon in Thailand and Japan, her fiancé Peter made her two cards so she could feel safe eating out. They worked, and now she's sharing them.",

  /** The journey, in order. */
  journey: [
    {
      title: "A lifetime of asking",
      body: "Julia has had a peanut allergy for as long as she can remember. At home she knows the drill: read every label, ask every server.",
    },
    {
      title: "Peter makes two cards",
      body: "A honeymoon in Thailand and Japan was coming, and Julia couldn't ask those questions in Thai or Japanese. So her fiancé made her a card for the chef and a card for emergencies.",
    },
    {
      title: "They work",
      body: "Satay, pad thai, curry pastes, the mortar used for every som tam: peanuts were everywhere. Julia handed the card to the waiter at every meal, got a clear yes or no, and ate with confidence.",
    },
    {
      title: "Now they're yours",
      body: "Julia wanted everyone with a peanut allergy to have what she had. Those same cards, checked by native speakers, for wherever you're eating next.",
    },
  ],

  note,

  /** What we believe, in three named principles. */
  principles: [
    {
      title: "A clear yes, with nothing lost in translation.",
      body: "Every chef card asks one question a restaurant kitchen can actually answer.",
    },
    {
      title: "Two cards, two jobs.",
      body: "One for the kitchen, one for an emergency. Each has English on the back, so you know what it says.",
    },
    {
      title: "Made for peanut.",
      body: "Peanut oil, sauces, shared woks and mortars: the details generic allergy cards miss.",
    },
  ],

  /** Caption for Julia's original card. */
  cardCaption: "The Thai chef card Peter made for Julia",
};
