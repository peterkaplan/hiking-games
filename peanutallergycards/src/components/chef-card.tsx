import type { ChefCardText, Translation } from "@/content/cards";
import { Emoji } from "./card-face";
import { NoPeanutIcon } from "./no-peanut-icon";

/**
 * The content of one side of a chef card. Sizes follow the card's width
 * (container queries), so it works as a thumbnail and full size.
 */
export const ChefCardFace = ({
  staffNotes = [],
  text,
}: {
  staffNotes?: readonly Translation<string>[];
  text: ChefCardText;
}) => (
  <div className="flex flex-col gap-4 @lg:flex-row @2xl:gap-6">
    <div className="flex shrink-0 flex-col items-center gap-3 @lg:w-28 @2xl:w-40">
      <NoPeanutIcon className="size-16 @lg:size-24 @2xl:size-32" />
      {staffNotes.map((note) => (
        <p
          className="text-xs @2xl:text-sm"
          key={note.language.code}
          lang={note.language.code}
        >
          {note.text}
        </p>
      ))}
    </div>
    <div className="space-y-2 text-sm font-medium @2xl:space-y-3 @2xl:text-base">
      <p className="text-base font-bold @2xl:text-xl">
        <Emoji>🚨</Emoji> {text.headline} <Emoji>🚨</Emoji>
      </p>
      <p>{text.intro}</p>
      <ul className="space-y-1">
        {text.risks.map((risk) => (
          <li key={risk}>• {risk}</li>
        ))}
      </ul>
      <p className="font-bold">
        <Emoji>⚠️</Emoji> {text.kitchenHeading}
      </p>
      <ul className="space-y-1">
        {text.kitchen.map((instruction) => (
          <li key={instruction}>• {instruction}</li>
        ))}
      </ul>
      <p>
        <Emoji>❓</Emoji> {text.question}
      </p>
    </div>
  </div>
);
