"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

export default function ProductReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.05, 0.4]);
  const blurClip = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
  );

  return (
    <section
      id="product"
      ref={ref}
      className="relative overflow-hidden bg-obsidian px-6 py-section text-ivory md:px-10"
    >
      <motion.div
        style={{ opacity: glow }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-[90px]"
      />
      <div className="grain" />

      <div className="relative mx-auto grid max-w-content items-center gap-14 md:grid-cols-2 md:gap-20">
        {/* Real product photograph */}
        <motion.div style={{ y, opacity: imgOpacity }} className="md:order-2">
          <div className="animate-floaty">
            <motion.div
              style={{ clipPath: blurClip }}
              className="relative aspect-[5/4] overflow-hidden rounded-sm ring-1 ring-gold/20 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
            >
              <Image
                src="/product-hero.webp"
                alt="Silvapasture Bilona Ghee — herbal rich, forest grazing, indigenous cow ghee"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
          <p className="mt-4 text-center text-[0.65rem] uppercase tracking-[0.25em] text-ivory/40">
            Single-season yield · Photographed where it is made
          </p>
        </motion.div>

        {/* Copy */}
        <div className="md:order-1">
          <Eyebrow>The Ghee</Eyebrow>
          <h2 className="serif mt-7 text-[clamp(2.4rem,5vw,4.4rem)] font-light leading-[1.05]">
            A single artefact,
            <br />
            <span className="italic text-gold-bright">drawn from the whole.</span>
          </h2>
          <p className="mt-8 max-w-prose text-lg leading-relaxed text-ivory/75">
            Herbal-rich, forest-grazing, indigenous-cow ghee — hand-churned by
            the bilona method and slow-cooked to perfection. We do not increase
            yield. We protect the conditions that make it possible, and bottle
            only what the land freely gives.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-ivory/70 sm:grid-cols-3">
            {[
              "Forest-grazed indigenous cows",
              "No additives, no preservatives",
              "Bilona churned",
              "Natural nourishment",
              "Slow cooked to perfection",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-4">
            <div>
              <span className="text-[0.7rem] uppercase tracking-[0.2em] text-ivory/50">
                Per jar · 250 ml
              </span>
              <p className="serif mt-1 text-4xl text-gold-bright">₹ 4,800</p>
            </div>
            <div className="text-sm text-ivory/60">
              <p>Limited annual yield</p>
              <p className="text-gold">214 jars remaining this season</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-5">
            <Button href="/the-ghee/reserve" variant="reserve">
              Reserve Your Jar
            </Button>
            <Button href="#founders" variant="text">
              Enter the Founders Circle
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
