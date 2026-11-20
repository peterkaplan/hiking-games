import type { ChefCardText, Translation } from "@/content/cards";
import { Emoji } from "./card-face";
import { NoPeanutIcon } from "./no-peanut-icon";

/** The content of one side of a chef card. */
export const ChefCardFace = ({
  staffNotes = [],
  text,
}: {
  staffNotes?: readonly Translation<string>[];
  text: ChefCardText;
}) => (
  <div className="flex flex-col gap-6 sm:flex-row">
    <div className="flex shrink-0 flex-col items-center gap-4 sm:w-44">
      <NoPeanutIcon className="size-32" />
      {staffNotes.map((note) => (
        <p
          className="text-sm"
          key={note.language.code}
          lang={note.language.code}
        >
          {note.text}
        </p>
      ))}
    </div>
    <div className="space-y-3 font-medium">
      <p className="text-xl font-bold">
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
