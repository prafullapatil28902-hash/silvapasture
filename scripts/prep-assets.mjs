import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pub = join(here, "..", "public");
const DL = "C:/Users/hp/Downloads";

await mkdir(join(pub, "vault"), { recursive: true });
await mkdir(join(pub, "cows"), { recursive: true });

const relicA = join(DL, "leonardo-ai-prompt-ultra-premium-cinemat_KmsHeANHWnKe8lkZ2gHcpg_f5hdD2ZOSQqhRZR3bTE1Jg.jpg");
const relicB = join(DL, "leonardo-ai-prompt-ultra-premium-cinemat_jw4X-C3RXemJeIY7j3xqJg_f5hdD2ZOSQqhRZR3bTE1Jg.jpg");
const gir = join(DL, "CompressJPEG.Online_img(800x800) - 2026-06-01T181031.500.jpg");
const istock = join(DL, "istockphoto-2270251385-1024x1024.jpg");

async function webp(input, out, { width, crop } = {}) {
  let img = sharp(input);
  if (crop) img = img.extract(crop);
  if (width) img = img.resize({ width });
  await img.webp({ quality: 82, effort: 5 }).toFile(join(pub, out));
  const m = await sharp(join(pub, out)).metadata();
  console.log(out.padEnd(30), m.width + "x" + m.height);
}

// Forest Relic — Vault product imagery
await webp(relicA, "vault/relic.webp", { width: 1500 });
await webp(relicB, "vault/relic-2.webp", { width: 1500 });

// Cow A (Gir) — full body + head-crop portrait
await webp(gir, "cows/kamadhenu.webp", { width: 800 });
await webp(gir, "cows/nandini.webp", { crop: { left: 468, top: 56, width: 332, height: 430 }, width: 700 });

// Cow B (iStock) — head crop, framed to avoid the watermarks (right-of-centre + bottom-left)
await webp(istock, "cows/surabhi.webp", { crop: { left: 196, top: 96, width: 440, height: 600 }, width: 700 });

console.log("\nDone.");
