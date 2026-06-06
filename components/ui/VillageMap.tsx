"use client";

import { motion } from "framer-motion";

/**
 * Stylised, illustrative map of the grazing region with an animated pin.
 * coords are in % of the frame.
 */
export default function VillageMap({
  x,
  y,
  village,
  region,
  area,
}: {
  x: number;
  y: number;
  village: string;
  region: string;
  area: string;
}) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] border border-ivory/10">
      {/* terrain */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#10241b] via-[#0f2b20] to-[#0a1d15]" />
      {/* contour lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={i}
            d={`M0 ${60 + i * 32} C 110 ${30 + i * 32}, 290 ${90 + i * 32}, 400 ${50 + i * 32}`}
            fill="none"
            stroke="rgba(197,164,109,0.14)"
            strokeWidth="1"
          />
        ))}
        {/* river */}
        <path
          d="M-10 220 C 120 200, 160 270, 280 240 S 420 250, 420 250"
          fill="none"
          stroke="rgba(120,170,200,0.25)"
          strokeWidth="4"
        />
        {/* forest dots */}
        {Array.from({ length: 26 }).map((_, i) => {
          const cx = (i * 71) % 400;
          const cy = (i * 113) % 300;
          return <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 3 : 2} fill="rgba(46,90,64,0.6)" />;
        })}
      </svg>

      {/* pin */}
      <div className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-100%)" }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center"
        >
          <span className="absolute -bottom-1 h-3 w-3 rounded-full bg-gold/30 blur-[2px]" />
          <span className="relative h-3 w-3 rounded-full bg-gold ring-4 ring-gold/25" />
          <span className="pointer-events-none absolute bottom-5 whitespace-nowrap rounded-full border border-ivory/15 bg-obsidian/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-sm">
            {village}
          </span>
        </motion.div>
      </div>

      {/* caption */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 bg-gradient-to-t from-obsidian/80 to-transparent p-4">
        <div>
          <p className="serif text-base text-ivory">{village}</p>
          <p className="text-[0.7rem] text-ivory/55">{region}</p>
        </div>
        <p className="max-w-[50%] text-right text-[0.7rem] text-gold/80">{area}</p>
      </div>
    </div>
  );
}
