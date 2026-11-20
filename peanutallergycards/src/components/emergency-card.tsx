import type { EmergencyCardText } from "@/content/cards";
import { Emoji } from "./card-face";

/** The content of one side of an emergency card. */
export const EmergencyCardFace = ({ text }: { text: EmergencyCardText }) => (
  <div className="space-y-3 text-base @md:space-y-4 @md:text-lg">
    <p className="text-alert text-lg font-bold @md:text-xl">
      <Emoji>🚨</Emoji> {text.headline} <Emoji>🚨</Emoji>
    </p>
    <p>{text.body}</p>
    <p className="font-bold">
      <Emoji>📞</Emoji> {text.call}
    </p>
  </div>
);
