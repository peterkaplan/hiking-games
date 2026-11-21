import "@fontsource-variable/atkinson-hyperlegible-next";
import "@fontsource/jersey-15";
import "@fontsource/tiny5";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

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
    <body className="font-sans text-lg antialiased">
      <SiteHeader />
      {children}
      <SiteFooter />
    </body>
  </html>
);

export default RootLayout;
