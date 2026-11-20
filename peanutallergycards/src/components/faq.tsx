import type { FaqItem } from "@/content/faq";

export const Faq = ({ items }: { items: readonly FaqItem[] }) => (
  <div className="divide-peanut-200 border-peanut-200 divide-y border-y">
    {items.map((item) => (
      <details className="group py-5" key={item.question}>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
          {item.question}
          <span
            aria-hidden="true"
            className="text-peanut-700 text-2xl transition group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <p className="mt-3 max-w-3xl text-stone-700">{item.answer}</p>
      </details>
    ))}
  </div>
);
