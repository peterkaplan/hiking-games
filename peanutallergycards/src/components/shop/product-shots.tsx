import type { ReactNode } from "react";
import { ChefCardFace } from "@/components/chef-card";
import { EmergencyCardFace } from "@/components/emergency-card";
import type { Destination } from "@/content/cards";
import { cardBacks } from "@/content/cards";

/*
 * Stand-ins for product photography: the real (placeholder) card designs
 * staged as physical objects. Swap for photos once real cards are printed.
 */

/** A laminated card: rounded corners, a soft shadow and a sheen. */
export const PhotoCard = ({
  children,
  className = "",
  lang,
}: {
  children: ReactNode;
  className?: string;
  lang: string;
}) => (
  <div
    className={`text-shop-ink @container relative overflow-hidden rounded-[14px] bg-white p-4 shadow-[0_18px_40px_-14px_rgba(60,66,46,0.45)] ring-1 ring-black/5 sm:p-5 ${className}`}
    data-product-shot
    lang={lang}
  >
    {children}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_32%)]"
    />
  </div>
);

export const ChefFrontCard = ({
  className,
  destination,
}: {
  className?: string;
  destination: Destination;
}) => {
  const { front } = destination.chefCard;
  if (!front) {
    return null;
  }
  return (
    <PhotoCard className={className} lang={front.language.code}>
      <ChefCardFace
        staffNotes={destination.chefCard.staffNotes}
        text={front.text}
      />
    </PhotoCard>
  );
};

export const ChefBackCard = ({
  className,
  destination,
}: {
  className?: string;
  destination: Destination;
}) => (
  <PhotoCard className={className} lang="en">
    <ChefCardFace text={cardBacks(destination).chef} />
  </PhotoCard>
);

export const EmergencyFrontCard = ({
  className,
  destination,
}: {
  className?: string;
  destination: Destination;
}) => {
  const { front } = destination.emergencyCard;
  if (!front) {
    return null;
  }
  return (
    <PhotoCard className={className} lang={front.language.code}>
      <EmergencyCardFace text={front.text} />
    </PhotoCard>
  );
};

export const EmergencyBackCard = ({
  className,
  destination,
}: {
  className?: string;
  destination: Destination;
}) => (
  <PhotoCard className={className} lang="en">
    <EmergencyCardFace text={cardBacks(destination).emergency} />
  </PhotoCard>
);

/*
 * Product shots draw each card at a real, landscape design width and shrink
 * the whole card with CSS `zoom`, so it keeps its proportions like a photo
 * of the object. The shrink factor comes from `--shot-zoom`, which each
 * context (hero, tile, gallery, thumbnail) sets for its own size.
 */
const shotZoom = "[zoom:var(--shot-zoom,0.4)]";

/** Both card fronts, fanned like a product shot. */
export const CardSetShot = ({ destination }: { destination: Destination }) => {
  if (!destination.chefCard.front) {
    return (
      <div className="flex justify-center">
        <EmergencyFrontCard
          className={`w-[620px] rotate-2 ${shotZoom}`}
          destination={destination}
        />
      </div>
    );
  }
  return (
    <div className="mx-auto flex w-fit flex-col">
      <ChefFrontCard
        className={`w-[760px] -rotate-2 ${shotZoom}`}
        destination={destination}
      />
      <EmergencyFrontCard
        className={`relative z-10 -mt-24 mr-2 ml-auto w-[520px] rotate-3 ${shotZoom}`}
        destination={destination}
      />
    </div>
  );
};

/** The digital version: the emergency card on a phone screen. */
export const PhoneShot = ({ destination }: { destination: Destination }) => {
  const { front } = destination.emergencyCard;
  const text = front?.text ?? cardBacks(destination).emergency;
  return (
    <div className="bg-shop-ink mx-auto w-[230px] rounded-[2.4rem] p-2.5 shadow-[0_24px_50px_-18px_rgba(60,66,46,0.6)]">
      <div className="bg-shop-cream flex aspect-[9/18] flex-col rounded-[1.9rem] px-3 pt-3 pb-6">
        <div className="bg-shop-ink mx-auto h-4 w-16 rounded-full" />
        <div className="mt-auto">
          <PhotoCard
            className="w-[440px] [zoom:0.42]"
            lang={front?.language.code ?? "en"}
          >
            <EmergencyCardFace text={text} />
          </PhotoCard>
        </div>
        <p className="text-shop-ink mt-3 text-center font-mono text-[10px] uppercase">
          Saved to photos · works offline
        </p>
      </div>
    </div>
  );
};

/** A coloured "studio" backdrop for product shots. */
export const Backdrop = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`flex items-center justify-center rounded-[28px] p-6 sm:p-10 ${className}`}
  >
    <div className="w-full">{children}</div>
  </div>
);

/** Backdrop colour per destination. */
export const destinationTint = (slug: string): string => {
  if (slug === "japan") {
    return "bg-shop-accent";
  }
  if (slug === "thailand") {
    return "bg-shop-mint";
  }
  return "bg-shop-sand";
};
