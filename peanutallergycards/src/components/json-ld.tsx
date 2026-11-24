import type { StructuredData } from "@/content/seo";

const LESS_THAN = /</gu;

/**
 * Structured data for search engines, as a JSON-LD script tag.
 *
 * React can only write the inside of a <script> through
 * dangerouslySetInnerHTML (as text it would escape the quotes and break the
 * JSON). It is safe here: the data comes only from our own content files,
 * never from a visitor, and "<" is escaped so nothing can close the tag.
 */
export const JsonLd = ({ data }: { data: readonly StructuredData[] }) => (
  <>
    {data.map((item) => (
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be written unescaped; see the comment above.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(item).replace(LESS_THAN, "\\u003c"),
        }}
        key={`${String(item["@type"])}-${String(item["@id"] ?? "")}`}
        type="application/ld+json"
      />
    ))}
  </>
);
