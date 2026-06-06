"use client";

import Counter from "@/components/ui/Counter";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const metrics = [
  { value: 1240, suffix: "", label: "Acres of forest preserved", sub: "Protected canopy, never cleared" },
  { value: 86, suffix: "", label: "Tribal families supported", sub: "Stewards, not suppliers" },
  { value: 312, suffix: "", label: "Indigenous cows protected", sub: "Native breeds, free-grazing" },
  { value: 47, suffix: "", label: "Native species returning", sub: "Biodiversity index, rising" },
];

export default function ImpactDashboard() {
  return (
    <section id="impact" className="bg-ivory px-6 py-section md:px-10">
      <div className="mx-auto max-w-content">
        <div className="max-w-prose">
          <Reveal>
            <Eyebrow>Impact &amp; Preservation</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 className="serif mt-7 text-[clamp(2rem,4vw,3.6rem)] font-light leading-tight text-forest">
              The numbers we are proudest of have nothing to do with sales.
            </h2>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} i={i} className="bg-ivory">
              <div className="flex h-full flex-col justify-between p-8 md:p-10">
                <span className="text-[5rem] font-light leading-none md:text-[4.5rem] lg:text-[5rem]">
                  <Counter to={m.value} suffix={m.suffix} />
                </span>
                <div className="mt-10">
                  <p className="serif text-xl text-forest">{m.label}</p>
                  <p className="mt-2 text-sm text-charcoal/55">{m.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal i={4}>
          <p className="serif mx-auto mt-16 max-w-2xl text-center text-xl italic text-charcoal/70">
            Each jar reserved extends this ledger. You are not a customer. You are
            a patron of a living place.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
