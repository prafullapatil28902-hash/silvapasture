"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Eyebrow from "@/components/ui/Eyebrow";

const stages = [
  { label: "Forest", note: "It begins where the canopy meets the light.", from: "#0a1d15", to: "#1e4d36" },
  { label: "Cow", note: "A native herd grazes the wild pasture, unhurried.", from: "#143a2b", to: "#2c5a40" },
  { label: "Milk", note: "Drawn at dawn, only what the calf can spare.", from: "#1e4d36", to: "#d8c29a" },
  { label: "Curd", note: "Set overnight with the previous day's culture.", from: "#cdbf9a", to: "#e7dcc0" },
  { label: "Butter", note: "Churned by hand until the butter gathers.", from: "#e7dcc0", to: "#e9d39a" },
  { label: "Bilona", note: "The wooden churn turns both ways. Never rushed.", from: "#e9d39a", to: "#d8b46a" },
  { label: "Ghee", note: "What remains when nothing was ever forced.", from: "#d8b46a", to: "#c5a46d" },
];

export default function JourneyOfJar() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="journey" ref={ref} className="relative bg-forest-deep">
      {/* tall scroll track */}
      <div style={{ height: `${stages.length * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          {/* stages */}
          {stages.map((s, i) => (
            <Stage
              key={s.label}
              index={i}
              total={stages.length}
              progress={scrollYProgress}
              data={s}
            />
          ))}

          {/* progress rail */}
          <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
            {stages.map((s, i) => (
              <Tick key={s.label} index={i} total={stages.length} progress={scrollYProgress} />
            ))}
          </div>

          <div className="absolute left-6 top-24 z-20 md:left-10">
            <Eyebrow>The Journey of One Jar</Eyebrow>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stage({
  index,
  total,
  progress,
  data,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  data: (typeof stages)[number];
}) {
  const seg = 1 / total;
  const start = index * seg;
  const opacity = useTransform(
    progress,
    [start - seg * 0.5, start, start + seg * 0.5, start + seg],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    progress,
    [start - seg * 0.5, start, start + seg],
    [1.08, 1, 0.96]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 50% 40%, ${data.to}, ${data.from})`,
        }}
      />
      <div className="grain" />
      <motion.div style={{ scale }} className="relative z-10 text-center">
        <span className="serif text-[0.8rem] uppercase tracking-[0.4em] text-ivory/50">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <h3 className="serif mt-4 text-[clamp(3rem,12vw,9rem)] font-light leading-none text-ivory mix-blend-difference">
          {data.label}
        </h3>
        <p className="serif mx-auto mt-6 max-w-md text-xl italic text-ivory/85">
          {data.note}
        </p>
      </motion.div>
    </motion.div>
  );
}

function Tick({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const opacity = useTransform(
    progress,
    [index * seg, index * seg + seg * 0.5],
    [0.3, 1]
  );
  const scaleY = useTransform(
    progress,
    [index * seg, index * seg + seg * 0.5, (index + 1) * seg],
    [0.4, 1, 0.4]
  );
  return (
    <motion.span
      style={{ opacity, scaleY }}
      className="h-6 w-px origin-center bg-gold"
    />
  );
}
