"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function HealthRing({
  score,
  size = 120,
  label,
  value,
}: {
  score: number;
  size?: number;
  label: string;
  value: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [shown, setShown] = useState(0);
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(eased * score));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, score]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(247,242,232,0.12)"
            strokeWidth={6}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#goldgrad)"
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ - (shown / 100) * circ}
          />
          <defs>
            <linearGradient id="goldgrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E2C485" />
              <stop offset="100%" stopColor="#C5A46D" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="serif text-2xl text-gold-bright">{shown}</span>
        </div>
      </div>
      {value ? <p className="serif mt-3 text-base text-ivory">{value}</p> : null}
      {label ? (
        <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/45">
          {label}
        </p>
      ) : null}
    </div>
  );
}
