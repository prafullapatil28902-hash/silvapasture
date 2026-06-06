"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

const posts = [
  {
    tag: "Our Story",
    title: "Not just ghee. An ecosystem in a jar.",
    read: "8 min",
    img: "/journal/our-story.webp",
    feature: true,
  },
  {
    tag: "The Craft",
    title: "The patience the bilona demands",
    read: "6 min",
    img: "/journal/bilona.webp",
  },
  {
    tag: "Indigenous Cattle",
    title: "The calf-first philosophy",
    read: "5 min",
    img: "/journal/calf.webp",
  },
  {
    tag: "Forest Restoration",
    title: "Why forest grazing changes everything",
    read: "7 min",
    img: "/journal/forest-graze.webp",
  },
  {
    tag: "Slow Living",
    title: "Churned by the rhythm of the full moon",
    read: "4 min",
    img: "/journal/full-moon.webp",
  },
];

export default function JournalPreview() {
  return (
    <section id="journal" className="bg-ivory px-6 py-section md:px-10">
      <div className="mx-auto max-w-content">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-prose">
            <Reveal>
              <Eyebrow>The Journal</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <h2 className="serif mt-7 text-[clamp(2rem,4vw,3.6rem)] font-light leading-tight text-forest">
                Field notes from a disappearing world.
              </h2>
            </Reveal>
          </div>
          <Reveal i={2}>
            <Button href="#" variant="text" dark>
              All stories
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.a
              href="#"
              key={p.title}
              data-hover
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col ${p.feature ? "md:col-span-2" : ""}`}
            >
              <div
                className={`relative overflow-hidden bg-obsidian ${
                  p.feature ? "aspect-[16/11]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.4s] ease-silk group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-obsidian/40 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-ivory backdrop-blur-sm">
                  {p.tag}
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="serif text-2xl leading-snug text-forest transition-colors group-hover:text-gold">
                  {p.title}
                </h3>
                <span className="shrink-0 text-xs text-charcoal/45">{p.read}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
