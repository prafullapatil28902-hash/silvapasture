"use client";

import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const rows = [
  { k: "Batch Number", v: "SP-0042" },
  { k: "Village", v: "Athgarh, Eastern Ghats" },
  { k: "Production Date", v: "April 2026" },
  { k: "Herd", v: "Native Khariar · 38 cows" },
  { k: "Ecosystem Impact", v: "0.3 acres preserved" },
];

export default function Traceability() {
  return (
    <section className="bg-ivory-dim px-6 py-section md:px-10">
      <div className="mx-auto grid max-w-content items-center gap-16 md:grid-cols-2 md:gap-24">
        <div className="max-w-prose">
          <Reveal>
            <Eyebrow>Traceability</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 className="serif mt-7 text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight text-forest">
              Every jar tells the truth of its origin.
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="mt-8 text-lg leading-relaxed text-charcoal/75">
              Scan the seal and the whole story opens — the exact forest, the
              family, the herd, the day. Transparency is not a feature here. It
              is the modern equivalent of a maker&apos;s hallmark.
            </p>
          </Reveal>

          <Reveal i={3}>
            <dl className="mt-12 divide-y divide-charcoal/10 border-y border-charcoal/10">
              {rows.map((r) => (
                <div
                  key={r.k}
                  className="flex items-center justify-between py-4"
                >
                  <dt className="text-[0.72rem] uppercase tracking-[0.18em] text-charcoal/50">
                    {r.k}
                  </dt>
                  <dd className="serif text-lg text-forest">{r.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* QR card */}
        <Reveal i={2}>
          <Link
            href="/trace/SP-0042"
            data-hover
            className="group mx-auto flex aspect-square max-w-sm flex-col items-center justify-center rounded-sm border border-charcoal/10 bg-ivory p-10 text-center shadow-sm transition-colors duration-500 hover:border-gold"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/qr/batch-SP-0042.svg"
              alt="Scan to trace batch SP-0042"
              width={190}
              height={190}
            />
            <p className="serif mt-8 text-xl text-forest transition-colors group-hover:text-gold">
              Scan to trace
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-charcoal/50">
              silvapasture.in/trace/SP-0042
            </p>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
