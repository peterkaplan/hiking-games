"use client";

import type { MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";

export interface GalleryView {
  content: ReactNode;
  id: string;
  label: string;
}

/**
 * Shows one card side at a time, with buttons to switch between sides.
 * Switching replays a short pixel "flip".
 */
export const CardGallery = ({ views }: { views: readonly GalleryView[] }) => {
  const [selectedId, setSelectedId] = useState(views[0]?.id);
  const selected = views.find((view) => view.id === selectedId) ?? views[0];
  const handleSelect = useCallback(
    (event: MouseEvent<HTMLButtonElement>) =>
      setSelectedId(event.currentTarget.value),
    []
  );

  return (
    <div>
      <div className="px-frame bg-peach p-4 sm:p-8">
        <div className="px-flip-in" key={selected?.id}>
          {selected?.content}
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        {views.map((view) => (
          <button
            aria-pressed={view.id === selected?.id}
            className="px-frame px-focus font-pixel text-px1 hover:bg-butter aria-pressed:bg-ink aria-pressed:text-paper bg-white px-3 py-1.5 transition-colors"
            key={view.id}
            onClick={handleSelect}
            type="button"
            value={view.id}
          >
            {view.label}
          </button>
        ))}
      </div>
    </div>
  );
};
