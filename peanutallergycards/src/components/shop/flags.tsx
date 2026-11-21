import Image from "next/image";

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
    src={`/flags/${code}.svg`}
    unoptimized
    width={60}
  />
);
