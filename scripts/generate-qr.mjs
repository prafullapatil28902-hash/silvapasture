import QRCode from "qrcode";
import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public", "qr");
await mkdir(outDir, { recursive: true });

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://silvapasture.in";

// Kept in sync with lib/data/cows.ts and lib/data/batches.ts
const cowIds = ["kamadhenu", "surabhi", "nandini"];
const batchIds = ["SP-0042", "SP-0043"];

const opts = {
  type: "svg",
  margin: 0,
  errorCorrectionLevel: "M",
  color: { dark: "#0F2B20", light: "#00000000" }, // forest on transparent
};

async function make(name, url) {
  const svg = await QRCode.toString(url, opts);
  await writeFile(join(outDir, name + ".svg"), svg, "utf8");
  console.log(name + ".svg  ->  " + url);
}

for (const id of cowIds) await make("cow-" + id, `${SITE}/cows/${id}`);
for (const id of batchIds) await make("batch-" + id, `${SITE}/trace/${id}`);

console.log("\nQR codes written to public/qr/");
