"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { lineReveal } from "@/lib/motion";
import Button from "@/components/ui/Button";

const lines = ["A forest.", "A village.", "A herd.", "A tradition."];

export default function HeroCinematic() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex h-screen min-h-[680px] items-center justify-center overflow-hidden bg-obsidian"
    >
      {/* Cinematic forest video */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/product-hero.webp"
        >
          <source src="/forest.mp4" type="video/mp4" />
        </video>
        {/* cinematic grade + vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/20 to-obsidian/80" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_30%,transparent_40%,rgba(11,11,9,0.7)_100%)]" />
        <div className="grain" />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-content px-6 text-center text-ivory"
      >
        <motion.span
          variants={lineReveal}
          initial="hidden"
          animate="show"
          className="eyebrow"
        >
          Silvapasture · A Forest in Every Spoonful
        </motion.span>

        <h1 className="serif mt-8 text-[clamp(2.6rem,7vw,6.8rem)] font-light leading-[1.02] drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)]">
          <Word i={0}>Luxury Born From</Word>
          <br />
          <Word i={1}>
            <span className="italic text-gold-bright">Living Ecosystems</span>
          </Word>
        </h1>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-base text-ivory/85 md:text-lg">
          {lines.map((l, i) => (
            <motion.span
              key={l}
              variants={lineReveal}
              custom={i + 2}
              initial="hidden"
              animate="show"
              className="serif italic"
            >
              {l}
            </motion.span>
          ))}
        </div>

        <motion.p
          variants={lineReveal}
          custom={7}
          initial="hidden"
          animate="show"
          className="serif mt-3 text-lg tracking-wide text-ivory/90 md:text-xl"
        >
          Preserved, not produced.
        </motion.p>

        <motion.div
          variants={lineReveal}
          custom={8}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <Button href="#ecosystem" variant="ghost">
            Explore the Ecosystem
          </Button>
          <Button href="/the-ghee/reserve" variant="text">
            Reserve Your Jar
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ivory/60"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <div className="mx-auto mt-3 h-10 w-px animate-pulse bg-ivory/40" />
      </motion.div>
    </section>
  );
}

function Word({ children, i }: { children: React.ReactNode; i: number }) {
  return (
    <motion.span
      variants={lineReveal}
      custom={i}
      initial="hidden"
      animate="show"
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}
