/**
 * Makes smaller copies of every photo in src/images so a phone doesn't
 * download the desktop-sized file. Runs before every build (`prebuild`).
 *
 *   src/images/wok.webp  ->  public/img/wok.<hash>.<width>.avif
 *                            public/img/wok.<hash>.<width>.webp
 *
 * Each size is made twice: AVIF (about a third smaller, for current
 * browsers) and WebP (for older ones). src/components/photo.tsx offers both
 * and the browser takes the first it understands.
 *
 * The list of what exists is written to src/images/variants.json, which
 * src/image-loader.ts reads. The hash comes from the source file, so a
 * changed image gets a new address and the files can be cached for a year.
 * Copies that already exist are kept, so only new photos take time.
 */
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "src/images";
const OUTPUT_DIR = "public/img";
const MANIFEST = "src/images/variants.json";
/** Keep in step with deviceSizes and imageSizes in next.config.ts. */
const WIDTHS = [320, 480, 800, 1200];
const WEBP_QUALITY = 75;
/** Looks the same as WebP at 75, in fewer bytes. */
const AVIF_QUALITY = 50;
const HASH_LENGTH = 10;

const wanted = new Set();
let made = 0;

/** Writes one copy unless it is already there. */
const make = async (fileName, write) => {
  wanted.add(fileName);
  const path = join(OUTPUT_DIR, fileName);
  if (!existsSync(path)) {
    await write(path);
    made += 1;
  }
};

const buildOne = async (file) => {
  const name = basename(file, ".webp");
  const source = await readFile(join(SOURCE_DIR, file));
  const hash = createHash("sha256")
    .update(source)
    .digest("hex")
    .slice(0, HASH_LENGTH);
  const { width: fullWidth } = await sharp(source).metadata();
  const smaller = WIDTHS.filter((width) => width < fullWidth);
  const widths = [...smaller, fullWidth];

  await Promise.all([
    ...smaller.map((width) =>
      make(`${name}.${hash}.${width}.webp`, (path) =>
        sharp(source)
          .resize({ width })
          .webp({ effort: 6, quality: WEBP_QUALITY })
          .toFile(path)
      )
    ),
    // The full-size WebP is copied as it is: re-encoding would only lose detail.
    make(`${name}.${hash}.${fullWidth}.webp`, (path) =>
      writeFile(path, source)
    ),
    ...widths.map((width) =>
      make(`${name}.${hash}.${width}.avif`, (path) =>
        sharp(source)
          .resize({ width })
          .avif({ effort: 4, quality: AVIF_QUALITY })
          .toFile(path)
      )
    ),
  ]);

  return [name, { hash, widths }];
};

await mkdir(OUTPUT_DIR, { recursive: true });

const files = (await readdir(SOURCE_DIR))
  .filter((file) => file.endsWith(".webp"))
  .sort();
const entries = [];
// One photo at a time: AVIF encoding already uses every processor core.
for (const file of files) {
  // biome-ignore lint/performance/noAwaitInLoops: deliberate, see above.
  entries.push(await buildOne(file));
}

// Remove copies of photos that have changed or gone.
const stale = (await readdir(OUTPUT_DIR)).filter((file) => !wanted.has(file));
await Promise.all(stale.map((file) => rm(join(OUTPUT_DIR, file))));

await writeFile(
  MANIFEST,
  `${JSON.stringify(Object.fromEntries(entries), null, 2)}\n`
);
process.stdout.write(
  `Images: ${files.length} photos, ${wanted.size} copies in ${OUTPUT_DIR} (${made} new, ${stale.length} removed)\n`
);
