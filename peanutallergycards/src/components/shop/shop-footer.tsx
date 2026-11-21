import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { destinations } from "@/content/cards";
import { NewsletterForm } from "./newsletter-form";

export const ShopFooter = () => (
  <footer className="border-shop-ink bg-shop-cream mt-28 border-t-2">
    <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2">
      <div>
        <h2 className="font-serif text-3xl">
          New countries and travel tips, straight to you.
        </h2>
        <p className="text-shop-ink mt-3 max-w-md">
          We&apos;ll email you when a new destination is checked and ready.
        </p>
        <div className="mt-6 max-w-lg">
          <NewsletterForm />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        <div>
          <h3 className="text-shop-ink font-mono text-xs tracking-widest uppercase">
            Shop
          </h3>
          <ul className="mt-4 space-y-2">
            {destinations.map((destination) => (
              <li key={destination.slug}>
                <Link
                  className="hover:underline"
                  href={`/v2/${destination.slug}`}
                >
                  {destination.country}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-shop-ink font-mono text-xs tracking-widest uppercase">
            Help
          </h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link className="hover:underline" href="/v2#how-it-works">
                How it works
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/v2#faq">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-shop-ink font-mono text-xs tracking-widest uppercase">
            Design
          </h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link className="hover:underline" href="/">
                See variant 1 (pixel)
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <Disclaimer />
      <p className="text-shop-ink mt-4 font-mono text-xs">
        © 2026 Peanut Allergy Cards
      </p>
    </div>
    <p
      aria-hidden="true"
      className="text-shop-ink mt-6 overflow-hidden px-2 text-center font-serif text-[9vw] leading-[0.85] tracking-tight whitespace-nowrap select-none"
    >
      Eat with confidence
    </p>
  </footer>
);
