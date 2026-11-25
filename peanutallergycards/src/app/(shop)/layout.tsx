import type { ReactNode } from "react";
import { CookieBanner } from "@/components/shop/cookie-banner";
import { ShopFooter } from "@/components/shop/shop-footer";
import { AnnouncementBar, ShopHeader } from "@/components/shop/shop-header";
import { shopFontVariables } from "@/fonts/shop-fonts";

/**
 * Layout for variant 2: a Shopify-style store. `data-palette` picks the
 * colour palette (greatjones or allbirds; see globals.css).
 */
const ShopLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div
    className={`${shopFontVariables} bg-shop-bg font-shop text-shop-ink min-h-screen text-lg`}
    data-palette="greatjones"
    id="top"
  >
    <a
      className="bg-shop-highlight text-shop-on-highlight sr-only rounded-full px-5 py-3 font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      href="#content"
    >
      Skip to content
    </a>
    <AnnouncementBar />
    <ShopHeader />
    {/* Where "Skip to content" lands: below the sticky header. */}
    <div className="scroll-mt-24" id="content">
      {children}
    </div>
    <ShopFooter />
    <CookieBanner />
  </div>
);

export default ShopLayout;
