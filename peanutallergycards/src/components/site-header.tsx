import Link from "next/link";
import { PixelArt } from "./pixel/pixel";
import { noPeanut } from "./pixel/sprites";

const navLinks = [
  { href: "/#how-it-works", label: "How it works", always: false },
  { href: "/#destinations", label: "Destinations", always: true },
  { href: "/#faq", label: "FAQ", always: false },
] as const;

export const SiteHeader = () => (
  <header className="bg-sky">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
      <Link className="group px-focus flex items-center gap-3" href="/">
        <PixelArt className="px-wiggle size-9" rows={noPeanut} />
        <span className="font-pixel text-px1">peanut allergy cards</span>
      </Link>
      <nav aria-label="Main">
        <ul className="font-pixel text-px1 hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => (
            <li
              className={link.always ? "" : "hidden md:block"}
              key={link.href}
            >
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
    </div>
  </header>
);
