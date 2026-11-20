import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Peanut Allergy Cards: chef and emergency cards for travel",
    template: "%s | Peanut Allergy Cards",
  },
  description:
    "Peanut allergy cards for travellers: a chef card for restaurants and an emergency card, in the local language with English on the back.",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <html lang="en">
    <body className="font-sans antialiased">
      <SiteHeader />
      {children}
      <SiteFooter />
    </body>
  </html>
);

export default RootLayout;
