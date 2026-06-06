"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function DisappearingWorld() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Drain the living forest of colour and light as the section scrolls.
  const gray = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const bright = useTransform(scrollYProgress, [0.2, 0.6], [1, 0.68]);
  const filter = useMotionTemplate`grayscale(${gray}) brightness(${bright})`;
  const lush = useTransform(scrollYProgress, [0.25, 0.5], [1, 0]);
  const cleared = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section className="relative bg-ivory px-6 py-section md:px-10" ref={ref}>
      <div className="mx-auto grid max-w-content items-center gap-16 md:grid-cols-2 md:gap-24">
        {/* Sticky media — a living forest, drained as you scroll */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-forest-deep md:sticky md:top-24">
          <motion.video
            style={{ filter }}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/forest.mp4" type="video/mp4" />
          </motion.video>
          <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" />
          <div className="grain opacity-20" />
          {/* Labels cross-fade */}
          <motion.span
            style={{ opacity: lush }}
            className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.2em] text-ivory/90"
          >
            Once — a living forest
          </motion.span>
          <motion.span
            style={{ opacity: cleared }}
            className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.2em] text-ivory/90"
          >
            Now — optimised, emptied
          </motion.span>
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-charcoal/10" />
        </div>

        {/* Editorial copy */}
        <div className="max-w-prose">
          <Reveal>
            <Eyebrow>The Disappearing World</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 className="serif mt-7 text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight text-forest">
              We optimised food.
              <br />
              We forgot the world
              <br />
              it came from.
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="mt-8 text-lg leading-relaxed text-charcoal/75">
              In a single generation, modern agriculture learned to produce more
              of everything — and quietly erased the forests, the native herds
              and the human hands that once made it whole. Yield rose. The world
              behind the food thinned to nothing.
            </p>
          </Reveal>
          <Reveal i={3}>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/75">
              Silvapasture exists for what was lost in that exchange. We do not
              farm an ingredient. We keep a whole ecosystem alive — and let it
              give what it has always given.
            </p>
          </Reveal>
          <Reveal i={4}>
            <blockquote className="serif mt-12 border-l border-gold pl-6 text-2xl italic leading-snug text-forest">
              “When nothing is forced, purity does not need to be created — it
              simply remains.”
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
