"use client";

import type { MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";

export interface GalleryView {
  content: ReactNode;
  id: string;
  label: string;
}

/** Shows one card side at a time, with buttons to switch between sides. */
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
      <div className="bg-peanut-100 rounded-3xl p-3 sm:p-8">
        {selected?.content}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {views.map((view) => (
          <button
            aria-pressed={view.id === selected?.id}
            className="border-peanut-200 hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink rounded-full border bg-white px-4 py-2 text-sm transition aria-pressed:text-white"
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
