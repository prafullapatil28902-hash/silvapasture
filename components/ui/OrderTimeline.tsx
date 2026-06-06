"use client";

import { motion } from "framer-motion";
import type { OrderStep } from "@/lib/data/orders";

export default function OrderTimeline({
  steps,
  current,
}: {
  steps: OrderStep[];
  current: number;
}) {
  return (
    <ol className="relative">
      {steps.map((step, i) => {
        const done = i <= current;
        const isCurrent = i === current;
        const last = i === steps.length - 1;
        return (
          <motion.li
            key={step.label}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid grid-cols-[auto_1fr] gap-x-6 pb-10 last:pb-0"
          >
            {/* connector */}
            {!last && (
              <span
                className={`absolute left-[11px] top-7 h-[calc(100%-1.25rem)] w-px ${
                  i < current ? "bg-gold/60" : "bg-ivory/12"
                }`}
              />
            )}
            {/* node */}
            <span className="relative mt-1 flex h-6 w-6 items-center justify-center">
              {isCurrent && (
                <span className="absolute h-6 w-6 animate-ping rounded-full bg-gold/30" />
              )}
              <span
                className={`relative h-3 w-3 rounded-full transition-colors ${
                  done ? "bg-gold ring-4 ring-gold/20" : "bg-ivory/25"
                }`}
              />
            </span>
            {/* content */}
            <div className={done ? "" : "opacity-50"}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h4 className="serif text-xl text-ivory">{step.label}</h4>
                <span className="text-[0.7rem] uppercase tracking-[0.18em] text-gold/80">
                  {step.date ?? "Pending"}
                </span>
              </div>
              <p className="mt-1 max-w-prose text-sm text-ivory/60">{step.note}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
