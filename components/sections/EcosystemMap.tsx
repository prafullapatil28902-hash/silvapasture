"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const nodes = [
  {
    id: "forest",
    label: "Forest",
    desc: "Protected canopy and undergrowth — the source of every nutrient that follows.",
  },
  {
    id: "grassland",
    label: "Grassland",
    desc: "Wild, unsprayed pasture where over forty native grasses and herbs grow.",
  },
  {
    id: "cows",
    label: "Indigenous Cows",
    desc: "Native, free-grazing breeds that thrive on the land rather than against it.",
  },
  {
    id: "villages",
    label: "Villages",
    desc: "Tribal families who steward the herd and hold the knowledge of the craft.",
  },
  {
    id: "bilona",
    label: "Bilona Craft",
    desc: "Hand-churned, bidirectional bilona — slow, unhurried, never mechanised.",
  },
  {
    id: "ghee",
    label: "Ghee",
    desc: "What remains when the whole ecosystem is kept intact. The artefact.",
  },
];

export default function EcosystemMap() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="ecosystem"
      className="relative overflow-hidden bg-forest px-6 py-section text-ivory md:px-10"
    >
      <div className="grain" />
      <div className="relative mx-auto max-w-content">
        <div className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">The Living Ecosystem</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 className="serif mx-auto mt-7 max-w-3xl text-[clamp(2rem,4vw,3.6rem)] font-light leading-tight">
              Nothing here stands alone. Each part keeps the next one alive.
            </h2>
          </Reveal>
        </div>

        {/* Connective chain */}
        <div className="mt-20">
          <div className="relative">
            {/* drawn line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-5 hidden h-px origin-left bg-gold/40 md:block"
            />
            <ul className="grid grid-cols-2 gap-y-12 md:grid-cols-6 md:gap-0">
              {nodes.map((n, i) => (
                <li
                  key={n.id}
                  className="flex flex-col items-center text-center"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  data-hover
                >
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + i * 0.12,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border transition-all duration-500 ${
                      active === i
                        ? "border-gold bg-gold text-forest"
                        : "border-gold/50 bg-forest text-gold hover:border-gold"
                    }`}
                    aria-label={n.label}
                  >
                    <span className="text-xs">{i + 1}</span>
                  </motion.button>
                  <span
                    className={`serif mt-4 text-lg transition-colors duration-500 ${
                      active === i ? "text-gold" : "text-ivory/80"
                    }`}
                  >
                    {n.label}
                  </span>
                  {i < nodes.length - 1 && (
                    <span className="mt-1 text-gold/40 md:hidden">↓</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Active node story */}
          <div className="mx-auto mt-16 min-h-[6rem] max-w-2xl text-center">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="serif text-2xl italic leading-relaxed text-ivory/90"
            >
              {nodes[active].desc}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
