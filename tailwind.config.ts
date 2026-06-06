import type { Config } from "tailwindcss";

const config: Config = {
  content: {
    // Resolve globs relative to THIS config file, not the process cwd, so the
    // build works regardless of where the dev server is launched from.
    relative: true,
    files: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  },
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#0F2B20", soft: "#1A3B2D", deep: "#0A1D15" },
        ivory: { DEFAULT: "#F7F2E8", dim: "#EDE6D6" },
        gold: { DEFAULT: "#C5A46D", soft: "#D8C29A", bright: "#E2C485" },
        charcoal: "#1A1A1A",
        obsidian: { DEFAULT: "#0B0B09", soft: "#15140F" },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "80rem",
        prose: "60ch",
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.16,1,0.3,1)",
      },
      spacing: {
        section: "clamp(6rem,12vw,12.5rem)",
      },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(-3%,1%,0)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%) skewX(-15deg)" },
          "100%": { transform: "translateX(220%) skewX(-15deg)" },
        },
      },
      animation: {
        drift: "drift 24s ease-in-out infinite",
        floaty: "floaty 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
