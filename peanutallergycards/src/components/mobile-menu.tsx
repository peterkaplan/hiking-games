"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export interface MenuLink {
  href: string;
  label: string;
}

/**
 * A menu button for small screens that opens a panel of links below the
 * header. The header must be positioned (relative or sticky). Each variant
 * passes its own class names.
 */
export const MobileMenu = ({
  buttonClassName,
  className,
  linkClassName,
  links,
  panelClassName,
}: {
  buttonClassName: string;
  className: string;
  linkClassName: string;
  links: readonly MenuLink[];
  panelClassName: string;
}) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggle = useCallback(() => setOpen((isOpen) => !isOpen), []);
  const close = useCallback(() => setOpen(false), []);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /** Escape closes the menu and puts focus back on its button. */
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    if (open) {
      document.addEventListener("keydown", closeOnEscape);
    }
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <div className={className}>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className={buttonClassName}
        onClick={toggle}
        ref={buttonRef}
        type="button"
      >
        <span className="sr-only">Menu</span>
        <svg
          aria-hidden="true"
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          {open ? (
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeLinecap="square"
              strokeWidth="2.5"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeLinecap="square"
              strokeWidth="2.5"
            />
          )}
        </svg>
      </button>
      <nav
        aria-label="Menu"
        className={`${panelClassName} ${open ? "" : "hidden"}`}
        id={panelId}
      >
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link className={linkClassName} href={link.href} onClick={close}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
