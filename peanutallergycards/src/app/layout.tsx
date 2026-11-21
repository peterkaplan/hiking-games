import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

/** The address the site will live at: used for links in search results. */
const SITE_URL = "https://peanutallergycards.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Peanut Allergy Cards: eat in restaurants abroad with confidence",
    template: "%s | Peanut Allergy Cards",
  },
  description:
    "Peanut allergy cards in the local language. Hand the card to your waiter, get a clear yes or no from the kitchen, and eat with confidence.",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <html lang="en">
    <body className="antialiased">{children}</body>
  </html>
);

export default RootLayout;
