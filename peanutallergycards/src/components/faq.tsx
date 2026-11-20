import type { FaqItem } from "@/content/faq";

export const Faq = ({ items }: { items: readonly FaqItem[] }) => (
  <div className="space-y-6">
    {items.map((item) => (
      <details className="group px-frame bg-white" key={item.question}>
        <summary className="px-focus font-pixel flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg">
          {item.question}
          <span
            aria-hidden="true"
            className="font-pixel text-2xl leading-none group-open:hidden"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="font-pixel hidden text-2xl leading-none group-open:inline"
          >
            −
          </span>
        </summary>
        <p className="max-w-3xl px-5 pb-5 text-lg">{item.answer}</p>
      </details>
    ))}
  </div>
);
