import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { pixelFontVariables } from "@/fonts/pixel-fonts";

/** Layout for the pixel-art variant. */
const PixelLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div className={`${pixelFontVariables} font-sans text-lg`}>
    <SiteHeader />
    {children}
    <SiteFooter />
  </div>
);

export default PixelLayout;
