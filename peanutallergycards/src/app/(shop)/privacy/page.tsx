import type { Metadata } from "next";
import { UnsubscribeForm } from "@/components/shop/unsubscribe-form";
import { LAST_UPDATED, privacyIntro, privacySections } from "@/content/privacy";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "What Peanut Allergy Cards collects, why, and how to have it removed. No tracking cookies, no ad trackers.",
  path: "/privacy",
});

const PrivacyPage = () => (
  <main className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:pt-14">
    <p className="font-mono text-xs tracking-widest uppercase">
      Last updated {LAST_UPDATED}
    </p>
    <h1 className="mt-3 font-serif text-5xl tracking-tight sm:text-6xl">
      Privacy policy
    </h1>
    <p className="mt-6 text-xl">{privacyIntro}</p>

    {privacySections.map((section) => (
      <section
        className="border-shop-ink mt-10 scroll-mt-28 border-t pt-8"
        id={section.id}
        key={section.heading}
      >
        <h2 className="font-serif text-3xl">{section.heading}</h2>
        {section.paragraphs.map((paragraph) => (
          <p className="mt-4" key={paragraph}>
            {paragraph}
          </p>
        ))}
        {section.id === "unsubscribe" ? (
          <div className="mt-6">
            <UnsubscribeForm />
          </div>
        ) : null}
      </section>
    ))}
  </main>
);

export default PrivacyPage;
