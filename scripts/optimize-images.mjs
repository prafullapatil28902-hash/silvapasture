import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, "..", "public");

// Per-file max width (keep aspect). Default 1400.
const widths = {
  "product-hero.png": 1600,
  "poster.png": 1000,
  "lifestyle.png": 1000,
};

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (extname(entry.name).toLowerCase() === ".png") out.push(p);
  }
  return out;
}

const files = await walk(publicDir);
let savedTotal = 0;

for (const file of files) {
  const base = file.split(/[\\/]/).pop();
  const maxW = widths[base] ?? 1400;
  const out = file.replace(/\.png$/i, ".webp");
  const before = (await stat(file)).size;

  const img = sharp(file);
  const meta = await img.metadata();
  const pipeline =
    meta.width && meta.width > maxW ? img.resize({ width: maxW }) : img;
  await pipeline.webp({ quality: 80, effort: 5 }).toFile(out);

  const after = (await stat(out)).size;
  savedTotal += before - after;
  await unlink(file);
  console.log(
    `${base.padEnd(22)} ${(before / 1024).toFixed(0).padStart(5)}KB -> ${(
      after / 1024
    )
      .toFixed(0)
      .padStart(5)}KB  (${meta.width}px, capped ${maxW})`
  );
}

console.log(`\nTotal saved: ${(savedTotal / 1024 / 1024).toFixed(2)} MB`);
