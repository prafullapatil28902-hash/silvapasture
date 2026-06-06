"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

const benefits = [
  { h: "Limited Yield", d: "A guaranteed allocation from each season's small, finite production." },
  { h: "Early Access", d: "First reservation rights before any jar is offered publicly." },
  { h: "Private Releases", d: "Rare single-village and single-season ghee, members only." },
  { h: "Impact Reports", d: "A private annual account of the forest, herd and families you sustain." },
];

export default function FoundersCircle() {
  return (
    <section
      id="founders"
      className="relative overflow-hidden bg-obsidian px-6 py-section text-ivory md:px-10"
    >
      <div className="grain" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(197,164,109,0.22), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-content items-center gap-16 md:grid-cols-2 md:gap-24">
        {/* Poster / packaging */}
        <Reveal>
          <div className="relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden rounded-sm ring-1 ring-gold/20 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
            <Image
              src="/poster.webp"
              alt="Silvapasture — A Forest in Every Spoonful"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Copy + benefits */}
        <div>
          <Eyebrow>By Invitation</Eyebrow>
          <h2 className="serif mt-7 text-[clamp(2.4rem,5vw,4.2rem)] font-light leading-[1.05]">
            The Founders Circle
          </h2>
          <p className="serif mt-6 max-w-xl text-xl italic text-ivory/80">
            A small, quiet membership for those who wish to keep a whole
            ecosystem alive — and be the first to receive what it gives.
          </p>

          <div className="mt-12 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <motion.div
                key={b.h}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-obsidian p-7"
              >
                <span className="serif text-2xl text-gold-bright">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="serif mt-3 text-lg">{b.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/60">{b.d}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <Button href="#" variant="ghost">
              Request an Invitation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
