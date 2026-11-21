import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** Layout for the pixel-art variant. */
const PixelLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div className="font-sans text-lg">
    <SiteHeader />
    {children}
    <SiteFooter />
  </div>
);

export default PixelLayout;
