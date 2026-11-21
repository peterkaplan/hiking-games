import Image from "next/image";

/** Where static files live: the site root, unless a preview build moves it. */
const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE ?? "/";

/**
 * A country's flag, by ISO code ("jp"). The files in public/flags come from
 * the country-flag-icons package (MIT); flag emoji don't show on every
 * device. Decorative: always pair a flag with the country's name.
 */
export const Flag = ({
  className = "",
  code,
}: {
  className?: string;
  code: string;
}) => (
  <Image
    alt=""
    className={className}
    data-flag=""
    height={40}
    src={`${ASSET_BASE}flags/${code}.svg`}
    unoptimized
    width={60}
  />
);
