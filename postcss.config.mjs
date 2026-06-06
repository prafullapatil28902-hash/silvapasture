import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// The preview/dev process may run with its cwd at a parent folder, which would
// make Tailwind's PostCSS plugin pick up a sibling project's tailwind config.
// Bind explicitly to THIS project's config via an absolute path.
const here = dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: {
    tailwindcss: { config: join(here, "tailwind.config.ts") },
    autoprefixer: {},
  },
};

export default config;
