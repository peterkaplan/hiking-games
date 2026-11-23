import { thai } from "./languages";
import type { Destination } from "./types";

const TRANSCRIBED_NOTE =
  "From the owner's Google Drawings card (2026-11-20). Retyped, then checked character for character against the PDF text (after mapping the PDF's tone-mark glyph variants back to standard Unicode).";

/**
 * Thailand. 1669 is the national medical emergency number.
 *
 * Still to add: the owner's card also has a short Burmese note for kitchen
 * staff (many restaurant workers in Thailand are from Myanmar). The PDF
 * scrambles Burmese text, so it needs pasting from the original into
 * chefCard.staffNotes.
 */
export const thailand: Destination = {
  slug: "thailand",
  country: "Thailand",
  emergencyNumber: "1669",
  sayPeanut: [
    {
      word: "ถั่วลิสง",
      romanised: "thua lisong",
      soundsLike: "TOO-ah lee-SONG",
      note: "The word on your card, and on menus and labels",
    },
  ],
  kitchenFocus: "the shared wok, the shared oil and the mortar and pestle",
  peanutFoods: [
    "Satay, served with a peanut dipping sauce",
    "Pad thai, often topped or served with crushed peanuts",
    "Som tam (papaya salad), often pounded with roasted peanuts in the same mortar used for every order",
    "Massaman and panang curries, and some curry pastes",
    "Street-food stalls, where one wok and one pot of oil are shared across dishes",
  ],
  chefCard: {
    front: {
      language: thai,
      sourceVersion: 2,
      review: { status: "draft", notes: TRANSCRIBED_NOTE },
      text: {
        headline: "แพ้ถั่วลิสงอย่างรุนแรงมาก (ฉันอาจตายได้)",
        intro: "นี่เป็นอาการที่ร้ายแรงมาก และฉันอาจตายได้หาก:",
        risks: [
          "อาหารมีส่วนผสมของถั่วลิสง หรือ ถั่วลิสงป่น (ถั่วคั่วบด)",
          "ปรุงด้วยถั่วลิสงในทุกรูปแบบ (รวมถึง น้ำมันถั่วลิสง เนยถั่ว น้ำจิ้มถั่ว และพริกแกงที่ใส่ถั่ว)",
          "สัมผัสกับถั่วลิสง",
        ],
        kitchenHeading: "ข้อปฏิบัติสำหรับห้องครัว:",
        kitchen: [
          "กรุณาใช้กระทะ หม้อ ตะหลิว และน้ำมันใหม่ที่สะอาด",
          "ห้ามใช้ครกที่เคยตำถั่วลิสงเด็ดขาด",
        ],
        question:
          "ทางร้านสามารถทำอาหารที่ปลอดภัย 100% ให้พวกเราได้ไหม? (หากไม่มั่นใจ กรุณาบอกได้เลยว่าทำไม่ได้ ขอบคุณมาก)",
      },
    },
    staffNotes: [],
  },
  emergencyCard: {
    front: {
      language: thai,
      sourceVersion: 2,
      review: { status: "draft", notes: TRANSCRIBED_NOTE },
      text: {
        headline: "ช่วยด้วยด่วน! (URGENT HELP!)",
        body: "ฉันกำลังเกิดภาวะช็อกจากการแพ้ถั่วลิสงอย่างรุนแรง (Anaphylactic Shock) ฉันหายใจไม่ออกและอาจตายได้",
        call: "กรุณาโทร 1669 เรียกรถพยาบาลเดี๋ยวนี้!",
      },
    },
  },
};
