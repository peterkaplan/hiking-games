import { PixelArt, palette, Sprite } from "./pixel";
import { cloud, walkerFrames } from "./sprites";

/**
 * Clouds drifting across the top and bottom edges of a section, clear of
 * its text. Place inside a `relative` parent.
 */
export const DriftingClouds = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    <PixelArt className="px-drift absolute top-1 left-0 w-16" rows={cloud} />
    <PixelArt
      className="px-drift px-drift-slow absolute bottom-3 left-0 w-28"
      rows={cloud}
    />
    <PixelArt
      className="px-drift px-drift-late absolute bottom-14 left-0 w-14 opacity-80"
      rows={cloud}
    />
  </div>
);

/**
 * A stair-stepped edge between two sections, drawn in `color` and sitting at
 * the bottom of the section above.
 */
export const PixelEdge = ({ color, id }: { color: string; id: string }) => (
  <svg
    aria-hidden="true"
    className="block h-3 w-full"
    preserveAspectRatio="none"
    shapeRendering="crispEdges"
  >
    <defs>
      <pattern height="12" id={id} patternUnits="userSpaceOnUse" width="24">
        <rect fill={color} height="4" width="24" />
        <rect fill={color} height="4" width="16" y="4" />
        <rect fill={color} height="4" width="8" y="8" />
      </pattern>
    </defs>
    <rect fill={`url(#${id})`} height="12" width="100%" />
  </svg>
);

/** The traveller walking along the top of the footer. */
export const Walker = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -top-[46px] left-0 h-[46px] w-full overflow-hidden"
  >
    <div className="px-walk absolute bottom-0 left-0 w-9">
      <svg
        aria-hidden="true"
        className="block h-auto w-full"
        shapeRendering="crispEdges"
        viewBox="0 0 18 23"
      >
        <g className="px-legs-a">
          <Sprite rows={walkerFrames[0]} />
        </g>
        <g className="px-legs-b">
          <Sprite rows={walkerFrames[1]} />
        </g>
      </svg>
    </div>
  </div>
);

/** A strip of pixel grass. */
export const Grass = () => (
  <div
    aria-hidden="true"
    className="h-2 w-full"
    style={{
      backgroundColor: palette.G,
      backgroundImage: `linear-gradient(to right, ${palette.g} 50%, transparent 50%)`,
      backgroundSize: "8px 4px",
      backgroundRepeat: "repeat-x",
    }}
  />
);
