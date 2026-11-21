import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

/*
 * Two design variants share this root:
 * - (pixel): the pixel-art site at / and /[destination];
 * - (shop): a Shopify-style store at /v2 and /v2/[destination].
 * Each route group has its own layout with its own header and footer.
 */

export const metadata: Metadata = {
  title: {
    default: "Peanut Allergy Cards: eat abroad with confidence",
    template: "%s | Peanut Allergy Cards",
  },
  description:
    "Peanut allergy cards in the local language. Show the card, get a clear yes or no from the kitchen, and eat with confidence.",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <html lang="en">
    <body className="antialiased">{children}</body>
  </html>
);

export default RootLayout;
