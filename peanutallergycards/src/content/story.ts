/**
 * Julia's story: a teaser on the store homepage and a full "Our story" page
 * (structure modelled on Ghia, Allbirds and Graza: mission headline, a
 * journey in steps, a signed note from the founder, named principles).
 *
 * Facts from the owner (2026-11-21): Julia has been allergic to peanuts her
 * whole life; on her honeymoon she went to Thailand and Japan and needed
 * these cards.
 *
 * Filled in by us and still TO CONFIRM with Julia:
 * - that she made her own cards for the trip (the Thai and Japanese cards
 *   in src/content/cards came from those originals);
 * - "read every label, ask every server" as her routine at home;
 * - that the language barrier in Japan made questions harder;
 * - that the cards "came to every meal";
 * - the whole of the note below, which is in her voice.
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
    "I've been allergic to peanuts my whole life, so I'm used to asking questions. At home that works. On our honeymoon in Thailand and Japan, it didn't: the menus were new, the language was new, and a nod from a busy server isn't the same as knowing.",
    "So I made two cards. One asked the kitchen, in their own language, whether they could make my food safely, and made it easy to say no. The other was for an emergency. Having them changed how every meal felt.",
    "I hope they do the same for you.",
  ],
  signOff: "Julia",
  role: "Founder, Peanut Allergy Cards",
};

export const story = {
  eyebrow: "Our story",
  heading: "Made by Julia, who's been allergic to peanuts her whole life.",
  mission:
    "We make the cards she needed on her honeymoon, so every meal abroad can start with a clear yes.",

  /** Homepage teaser. */
  teaser:
    "On her honeymoon in Thailand and Japan, asking “is there peanut in this?” wasn't enough. So she made her own cards.",

  /** The journey, in order. */
  journey: [
    {
      title: "A lifetime of asking",
      body: "Julia has had a peanut allergy for as long as she can remember. At home she knows the drill: read every label, ask every server.",
    },
    {
      title: "The honeymoon",
      body: "Thailand and Japan. Peanuts in satay, pad thai, curry pastes and the mortar used for every som tam, and a language barrier at every meal.",
    },
    {
      title: "Her own cards",
      body: "One for the chef, asking for a straight yes or no. One for emergencies, with the local ambulance number. They came to every meal.",
    },
    {
      title: "Peanut Allergy Cards",
      body: "Those same cards, checked by native speakers, for every traveller who needs them.",
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
  cardCaption: "Julia's Thai chef card, from the honeymoon",
};
