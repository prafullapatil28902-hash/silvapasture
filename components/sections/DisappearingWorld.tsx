"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function DisappearingWorld() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Complementary crossfade (same photo, colour -> drained) so a full image is
  // always visible — no washed-out gap where the page background shows through.
  const lush = useTransform(scrollYProgress, [0.2, 0.55], [1, 0]);
  const cleared = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);

  return (
    <section className="relative bg-ivory px-6 py-section md:px-10" ref={ref}>
      <div className="mx-auto grid max-w-content items-center gap-16 md:grid-cols-2 md:gap-24">
        {/* Sticky media — the world before and after */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] md:sticky md:top-24">
          {/* ONCE — a living world (full colour) */}
          <motion.div style={{ opacity: lush }} className="absolute inset-0">
            <Image
              src="/cows/kamadhenu.webp"
              alt="A living world"
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
            <span className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.2em] text-ivory/90">
              Once — a living world
            </span>
          </motion.div>
          {/* NOW — optimised, emptied (drained of colour and light) */}
          <motion.div style={{ opacity: cleared }} className="absolute inset-0">
            <Image
              src="/cows/kamadhenu.webp"
              alt="The emptied world"
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover grayscale brightness-[0.7] contrast-[0.9]"
            />
            <div className="absolute inset-0 bg-[#b6a988]/45 mix-blend-luminosity" />
            <div className="grain opacity-25" />
            <span className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.2em] text-ivory/80">
              Now — optimised, emptied
            </span>
          </motion.div>
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
