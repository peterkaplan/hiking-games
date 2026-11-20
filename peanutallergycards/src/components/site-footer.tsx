import { Disclaimer } from "./disclaimer";

export const SiteFooter = () => (
  <footer className="border-peanut-200/70 bg-peanut-50 mt-24 border-t">
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-display font-bold">Peanut Allergy Cards</p>
      <Disclaimer />
      <p className="mt-6 text-xs text-stone-500">© 2026 Peanut Allergy Cards</p>
    </div>
  </footer>
);
