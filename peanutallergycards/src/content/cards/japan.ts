import { japanese } from "./languages";
import type { Destination } from "./types";

/**
 * Japan. 119 is the number for an ambulance (and fire).
 *
 * The chef card hasn't been written in Japanese yet. Its kitchen lines (wok,
 * mortar and pestle) suit Southeast Asian kitchens, so the Japanese version
 * may need different kitchen instructions.
 */
export const japan: Destination = {
  slug: "japan",
  country: "Japan",
  emergencyNumber: "119",
  sayPeanut: [
    {
      word: "ピーナッツ",
      romanised: "piinattsu",
      soundsLike: "PEE-nah-tsu",
      note: "The everyday word, and the one on your card",
    },
    {
      word: "落花生",
      romanised: "rakkasei",
      soundsLike: "RAHK-kah-say",
      note: "Often the word on ingredient labels",
    },
  ],
  peanutFoods: [],
  chefCard: {
    front: null,
    staffNotes: [],
  },
  emergencyCard: {
    front: {
      language: japanese,
      sourceVersion: 2,
      review: {
        status: "draft",
        notes:
          "Copied exactly from the owner's Google Drawings card (2026-11-20).",
      },
      text: {
        headline: "緊急！助けてください！",
        body: "重度のピーナッツ（落花生）アレルギーによるアナフィラキシーショックを起こしています。息ができず、死ぬ可能性があります。",
        call: "今すぐ 119番 に電話して救急車を呼んでください！",
      },
    },
  },
};
