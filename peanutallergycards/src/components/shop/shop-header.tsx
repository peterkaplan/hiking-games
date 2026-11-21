import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { CartCount } from "@/components/shop/cart-view";
import { LAUNCH_PREVIEW } from "@/content/launch-preview";
import { maxSaving, maxSavingCountries } from "@/content/pricing";

/** The best multi-country saving, e.g. 25. */

const navLinks = [
  { href: "/v2#destinations", label: "Shop by country" },
  { href: "/v2#how-it-works", label: "How it works" },
  { href: "/v2/our-story", label: "Our story" },
  ...(LAUNCH_PREVIEW ? [] : [{ href: "/v2#reviews", label: "Reviews" }]),
  { href: "/v2#faq", label: "FAQ" },
] as const;

export const AnnouncementBar = () => (
  <aside
    aria-label="Store announcement"
    className="bg-shop-band text-shop-on-band px-4 py-2.5 text-center font-mono text-xs tracking-wider uppercase"
  >
    <p>
      <span className="sm:hidden">
        Trip pack: save {maxSaving}% · instant download
      </span>
      <span className="hidden sm:inline">
        Trip pack: {maxSavingCountries} countries, save {maxSaving}% · Instant
        download · Every card checked by a native speaker
      </span>
    </p>
  </aside>
);

const CartIcon = () => (
  <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
    <path
      d="M5 7h14l-1.2 12.1a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 7Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path d="M9 7a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const ShopHeader = () => (
  <header className="border-shop-ink bg-shop-bg sticky top-0 z-30 border-b backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
      <MobileMenu
        buttonClassName="hover:bg-shop-panel rounded-full p-2 focus-visible:outline-3 focus-visible:outline-shop-ink"
        className="lg:hidden"
        linkClassName="block px-6 py-4 font-serif text-2xl hover:bg-shop-panel"
        links={navLinks}
        panelClassName="absolute inset-x-0 top-full border-shop-ink border-b-2 bg-shop-bg py-2"
      />
      <Link
        className="font-serif text-2xl leading-none tracking-tight"
        href="/v2"
      >
        Peanut Allergy Cards
      </Link>
      <nav aria-label="Main" className="hidden lg:block">
        <ul className="flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className="underline-offset-8 hover:underline"
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-3">
        <Link
          className="bg-shop-highlight text-shop-on-highlight hidden rounded-full px-4 py-2 font-mono text-xs uppercase hover:underline xl:inline-block"
          href="/v2/trip-pack"
        >
          Trip pack · save {maxSaving}%
        </Link>
        <Link
          className="hover:bg-shop-panel relative rounded-full p-2"
          href="/v2/cart"
        >
          <CartIcon />
          <CartCount />
        </Link>
      </div>
    </div>
  </header>
);
