import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { WebAnalytics } from "@/components/web-analytics";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/content/seo";
import "./globals.css";

const DESCRIPTION =
  "Peanut allergy cards in the local language. Hand the card to your waiter, get a clear yes or no from the kitchen, and eat with confidence.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Peanut Allergy Cards: eat in restaurants abroad with confidence",
    titleIsComplete: true,
    description: DESCRIPTION,
    path: "/",
  }),
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Peanut Allergy Cards: eat in restaurants abroad with confidence",
    template: `%s | ${SITE_NAME}`,
  },
  // Pages that don't set their own address (cart, not found) have none.
  alternates: {},
};

/** The colour phones use for the browser bar: the page background. */
export const viewport: Viewport = { themeColor: "#faeddf" };

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <html lang="en">
    <body className="antialiased">
      {children}
      <WebAnalytics />
    </body>
  </html>
);

export default RootLayout;
