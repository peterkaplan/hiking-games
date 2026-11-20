import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peanut Allergy Cards",
  description:
    "Free peanut allergy cards in other languages, for travelling and eating out.",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <html lang="en">
    <body className="antialiased">{children}</body>
  </html>
);

export default RootLayout;
