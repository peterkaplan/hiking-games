import type { EmergencyCardText } from "@/content/cards";
import { Emoji } from "./card-face";

/** The content of one side of an emergency card. */
export const EmergencyCardFace = ({ text }: { text: EmergencyCardText }) => (
  <div className="space-y-4 text-lg">
    <p className="text-xl font-bold text-red-600">
      <Emoji>🚨</Emoji> {text.headline} <Emoji>🚨</Emoji>
    </p>
    <p>{text.body}</p>
    <p className="font-bold">
      <Emoji>📞</Emoji> {text.call}
    </p>
  </div>
);
