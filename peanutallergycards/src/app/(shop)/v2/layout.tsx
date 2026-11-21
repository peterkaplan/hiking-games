import type { ReactNode } from "react";
import { ShopFooter } from "@/components/shop/shop-footer";
import { AnnouncementBar, ShopHeader } from "@/components/shop/shop-header";
import { shopFontVariables } from "@/fonts/shop-fonts";

/** Layout for variant 2: a Shopify-style store. */
const ShopLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div
    className={`${shopFontVariables} bg-shop-cream font-shop text-shop-ink min-h-screen text-lg`}
  >
    <AnnouncementBar />
    <ShopHeader />
    {children}
    <ShopFooter />
  </div>
);

export default ShopLayout;
