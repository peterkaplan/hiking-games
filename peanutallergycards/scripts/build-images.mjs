/**
 * Makes smaller copies of every photo in src/images so a phone doesn't
 * download the desktop-sized file. Runs before every build (`prebuild`).
 *
 *   src/images/wok.webp  ->  public/img/wok.<hash>.<width>.webp
 *
 * The list of what exists is written to src/images/variants.json, which
 * src/image-loader.ts reads to pick a file for each screen size. The hash
 * comes from the source file, so a changed image gets a new address and the
 * files can be cached for a year.
 */
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "src/images";
const OUTPUT_DIR = "public/img";
const MANIFEST = "src/images/variants.json";
/** Keep in step with deviceSizes and imageSizes in next.config.ts. */
const WIDTHS = [320, 480, 800, 1200];
const QUALITY = 75;
const HASH_LENGTH = 10;

const buildOne = async (file) => {
  const name = basename(file, ".webp");
  const source = await readFile(join(SOURCE_DIR, file));
  const hash = createHash("sha256")
    .update(source)
    .digest("hex")
    .slice(0, HASH_LENGTH);
  const { width: fullWidth } = await sharp(source).metadata();
  const smaller = WIDTHS.filter((width) => width < fullWidth);

  await Promise.all(
    smaller.map((width) =>
      sharp(source)
        .resize({ width })
        .webp({ effort: 6, quality: QUALITY })
        .toFile(join(OUTPUT_DIR, `${name}.${hash}.${width}.webp`))
    )
  );
  // The full-size file is copied as it is: re-encoding it would only lose detail.
  await writeFile(
    join(OUTPUT_DIR, `${name}.${hash}.${fullWidth}.webp`),
    source
  );

  return [name, { hash, widths: [...smaller, fullWidth] }];
};

await rm(OUTPUT_DIR, { force: true, recursive: true });
await mkdir(OUTPUT_DIR, { recursive: true });

const files = (await readdir(SOURCE_DIR))
  .filter((file) => file.endsWith(".webp"))
  .sort();
const entries = await Promise.all(files.map(buildOne));

await writeFile(
  MANIFEST,
  `${JSON.stringify(Object.fromEntries(entries), null, 2)}\n`
);
process.stdout.write(
  `Images: ${files.length} photos resized into ${OUTPUT_DIR}\n`
);
