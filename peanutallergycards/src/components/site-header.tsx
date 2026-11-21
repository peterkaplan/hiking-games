import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { PixelArt } from "./pixel/pixel";
import { noPeanut } from "./pixel/sprites";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#destinations", label: "Destinations" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const SiteHeader = () => (
  <header className="bg-sky relative z-20">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
      <Link className="group px-focus flex items-center gap-3" href="/">
        <PixelArt className="px-wiggle size-9" rows={noPeanut} />
        <span className="font-pixel text-px1">peanut allergy cards</span>
      </Link>
      <nav aria-label="Main">
        <ul className="font-pixel text-px1 hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className="px-focus underline-offset-4 hover:underline"
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <MobileMenu
        buttonClassName="px-frame px-focus bg-paper p-1.5"
        className="md:hidden"
        linkClassName="px-focus block px-5 py-3 font-pixel text-px1 hover:bg-butter"
        links={navLinks}
        panelClassName="px-frame absolute inset-x-4 top-full bg-paper py-2"
      />
    </div>
  </header>
);
