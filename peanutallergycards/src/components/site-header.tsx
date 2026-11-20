import Link from "next/link";
import { NoPeanutIcon } from "./no-peanut-icon";

const navLinks = [
  { href: "/#destinations", label: "Destinations" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const SiteHeader = () => (
  <header className="border-peanut-200/70 border-b">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
      <Link className="flex items-center gap-2.5" href="/">
        <NoPeanutIcon className="size-8" />
        <span className="font-display text-lg font-bold tracking-tight">
          Peanut Allergy Cards
        </span>
      </Link>
      <nav aria-label="Main">
        <ul className="flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <li
              className={
                link.href === "/#destinations" ? "" : "hidden sm:block"
              }
              key={link.href}
            >
              <Link className="hover:text-ink text-stone-700" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);
