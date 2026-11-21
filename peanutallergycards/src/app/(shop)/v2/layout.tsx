import type { ReactNode } from "react";
import { ShopFooter } from "@/components/shop/shop-footer";
import { AnnouncementBar, ShopHeader } from "@/components/shop/shop-header";
import { shopFontVariables } from "@/fonts/shop-fonts";

/**
 * Layout for variant 2: a Shopify-style store. `data-palette` picks the
 * colour palette (greatjones, graza or allbirds; see globals.css).
 */
const ShopLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div
    className={`${shopFontVariables} bg-shop-bg font-shop text-shop-ink min-h-screen text-lg`}
    data-palette="greatjones"
  >
    <AnnouncementBar />
    <ShopHeader />
    {children}
    <ShopFooter />
  </div>
);

export default ShopLayout;
