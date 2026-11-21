import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { destinations } from "@/content/cards";
import { bundleTiers } from "@/content/pricing";
import { NewsletterForm } from "./newsletter-form";

/*
 * Structure from the reference stores' footers: a full-width dark band
 * (Ghia, Great Jones, Allbirds), a brand mark breaking the top edge (Ghia's
 * eye), a playful sign-up headline (Ghia), link columns (all of them), the
 * name as large as the page allows (Ghia, Graza), and a small legal row.
 * Only real pages are linked: no social accounts or policies we don't have.
 */

const maxSaving = Math.max(...bundleTiers.map((tier) => tier.discountPercent));

interface FooterLink {
  href: string;
  label: string;
}

const columns: readonly { heading: string; links: readonly FooterLink[] }[] = [
  {
    heading: "Shop",
    links: [
      ...destinations.map((destination) => ({
        href: `/v2/${destination.slug}`,
        label: `The ${destination.country} Set`,
      })),
      { href: "/v2#trip-pack", label: `Trip pack: save ${maxSaving}%` },
      { href: "/v2#destinations", label: "All countries" },
    ],
  },
  {
    heading: "About",
    links: [
      { href: "/v2/our-story", label: "Our story" },
      { href: "/v2#translation-desk", label: "The translation desk" },
      { href: "/v2#reviews", label: "Reviews" },
    ],
  },
  {
    heading: "Help",
    links: [
      { href: "/v2#how-it-works", label: "How the cards work" },
      { href: "/v2#compare", label: "Card or app?" },
      { href: "/v2#faq", label: "FAQ" },
    ],
  },
];

const footerLink =
  "focus-visible:outline-shop-on-band rounded-sm decoration-2 underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:outline-offset-4";

/** 2πr for the stamp's ring of text (r = 62). */
const STAMP_RING_LENGTH = 389.5;

/** A turning stamp that breaks the footer's top edge. Decorative. */
const FooterStamp = () => (
  <div
    aria-hidden="true"
    className="bg-shop-band absolute -top-20 left-1/2 size-40 -translate-x-1/2 rounded-full"
  >
    <svg
      aria-hidden="true"
      className="size-full motion-safe:animate-[spin_40s_linear_infinite]"
      viewBox="0 0 160 160"
    >
      <defs>
        <path
          d="M80 80 m-62 0 a62 62 0 1 1 124 0 a62 62 0 1 1 -124 0"
          fill="none"
          id="footer-stamp-ring"
        />
      </defs>
      <text className="fill-shop-on-band font-mono text-[12px]">
        <textPath
          href="#footer-stamp-ring"
          lengthAdjust="spacing"
          textLength={STAMP_RING_LENGTH}
        >
          EAT WITH CONFIDENCE ✦ EAT WITH CONFIDENCE ✦{" "}
        </textPath>
      </text>
    </svg>
    <svg
      aria-hidden="true"
      className="absolute inset-0 m-auto size-20"
      viewBox="0 0 64 64"
    >
      <path
        className="fill-shop-highlight"
        d="M20 3c9 0 15 7 14 16-.5 6-4 9-4 13s6 7 5.5 15c-.5 9-7.5 15-15.5 15S5 56 4.5 47C4 39 10 36 10 32s-3.5-7-4-13C5 10 11 3 20 3Z"
        transform="translate(32 32) rotate(35) scale(0.62) translate(-20 -32.5)"
      />
      <circle
        className="stroke-shop-on-band"
        cx="32"
        cy="32"
        fill="none"
        r="28"
        strokeWidth="4"
      />
      <path
        className="stroke-shop-band"
        d="M12.5 12.5 51.5 51.5"
        fill="none"
        strokeWidth="9"
      />
      <path
        className="stroke-shop-on-band"
        d="M12.2 12.2 51.8 51.8"
        fill="none"
        strokeWidth="4"
      />
    </svg>
  </div>
);

export const ShopFooter = () => (
  <footer className="bg-shop-band text-shop-on-band @container relative mt-44">
    <FooterStamp />
    <div className="mx-auto grid max-w-7xl gap-16 px-4 pt-32 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-20">
      <div className="min-w-0">
        <h2 className="font-serif text-[2.5rem] leading-none tracking-tight sm:text-6xl">
          Our emails are 100%{" "}
          <span className="whitespace-nowrap">peanut-free.</span>
        </h2>
        <p className="mt-5 max-w-md">
          One email when a new country has been checked by a native speaker,
          plus the occasional tip for eating out abroad. Nothing else.
        </p>
        <div className="mt-8 max-w-xl">
          <NewsletterForm />
        </div>
      </div>
      <nav
        aria-label="Footer"
        className="grid min-w-0 grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3"
      >
        {columns.map((column) => (
          <div key={column.heading}>
            <h3 className="text-shop-highlight font-mono text-xs tracking-[0.18em] uppercase">
              {column.heading}
            </h3>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link className={footerLink} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>

    {/* The name, as wide as the page: stacked on phones, one line above. */}
    <p
      aria-hidden="true"
      className="text-shop-highlight px-4 font-serif text-[calc((100cqw-2rem)/3.5)] leading-[0.86] tracking-tight select-none sm:px-6 md:text-[calc((100cqw-3rem)/10.2)] md:whitespace-nowrap"
    >
      <span className="block md:inline">Peanut </span>
      <span className="block md:inline">Allergy </span>
      <span className="block md:inline">Cards</span>
    </p>

    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 pt-6 pb-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
      <Disclaimer />
      <p className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
        <span>© 2026 Peanut Allergy Cards</span>
        <a className={footerLink} href="#top">
          Back to top ↑
        </a>
      </p>
    </div>
  </footer>
);
