import { Disclaimer } from "./disclaimer";
import { Grass, Walker } from "./pixel/decor";

export const SiteFooter = () => (
  <footer className="bg-ink text-paper relative mt-32">
    <Walker />
    <Grass />
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-pixel text-2xl">peanut allergy cards</p>
      <p className="text-paper/80 mt-2 max-w-xl">
        Show the card. Get a clear yes. Eat with confidence.
      </p>
      <Disclaimer />
      <p className="font-pixel text-paper/60 mt-8 text-sm">
        © 2026 Peanut Allergy Cards
      </p>
    </div>
  </footer>
);
