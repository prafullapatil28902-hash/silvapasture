"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CinematicQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={ref}
      className="relative flex h-[80vh] min-h-[520px] items-center justify-center overflow-hidden bg-obsidian"
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/lifestyle.webp"
        >
          <source src="/forest-2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-obsidian/55" />
        <div className="grain" />
      </motion.div>

      <motion.blockquote
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center text-ivory"
      >
        <p className="serif text-[clamp(1.8rem,4.5vw,3.8rem)] font-light italic leading-[1.15]">
          “When nothing is forced, purity does not need to be created —
          <br className="hidden md:block" /> it simply remains.”
        </p>
        <footer className="mt-8 text-[0.7rem] uppercase tracking-[0.3em] text-gold">
          The Silvapasture Philosophy
        </footer>
      </motion.blockquote>
    </section>
  );
}
