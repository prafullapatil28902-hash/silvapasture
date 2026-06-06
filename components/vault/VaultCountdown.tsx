"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const now = Date.now();
  const d = Math.max(0, target - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
  };
}

export default function VaultCountdown({ iso }: { iso: string }) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: [string, number][] = t
    ? [
        ["Days", t.days],
        ["Hours", t.hours],
        ["Minutes", t.minutes],
        ["Seconds", t.seconds],
      ]
    : [
        ["Days", 0],
        ["Hours", 0],
        ["Minutes", 0],
        ["Seconds", 0],
      ];

  return (
    <div className="flex items-start gap-5 sm:gap-8">
      {units.map(([label, value], i) => (
        <div key={label} className="flex items-start gap-5 sm:gap-8">
          <div className="text-center">
            <span className="serif block text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-none text-ivory tabular-nums">
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-2 block text-[0.62rem] uppercase tracking-[0.25em] text-gold/80">
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-none text-gold/40">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
