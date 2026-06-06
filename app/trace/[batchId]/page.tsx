import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { batches } from "@/lib/data/batches";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

export function generateStaticParams() {
  return Object.keys(batches).map((batchId) => ({ batchId }));
}

export function generateMetadata({
  params,
}: {
  params: { batchId: string };
}): Metadata {
  const b = batches[params.batchId.toUpperCase()];
  return {
    title: b
      ? `Batch ${b.id} · Traceability — Silvapasture`
      : "Traceability — Silvapasture",
  };
}

export default function TracePage({
  params,
}: {
  params: { batchId: string };
}) {
  const batch = batches[params.batchId.toUpperCase()];
  if (!batch) notFound();

  const rows = [
    { k: "Batch Number", v: batch.id },
    { k: "Village", v: batch.village },
    { k: "Region", v: batch.region },
    { k: "Production Date", v: batch.productionDate },
    { k: "Herd", v: `${batch.herd} · ${batch.cows} cows` },
    { k: "Churned By", v: batch.churnedBy },
    { k: "Moon Phase", v: batch.moonPhase },
    { k: "Season Yield", v: `${batch.yieldJars} jars` },
  ];

  return (
    <article className="bg-ivory">
      {/* Hero band */}
      <header className="bg-obsidian px-6 pb-20 pt-36 text-ivory md:px-10 md:pt-44">
        <div className="mx-auto max-w-content">
          <Eyebrow>Traceability</Eyebrow>
          <h1 className="serif mt-7 text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.02]">
            Batch{" "}
            <span className="italic text-gold-bright">{batch.id}</span>
          </h1>
          <p className="serif mt-4 max-w-xl text-xl italic text-ivory/75">
            {batch.notes}
          </p>
        </div>
      </header>

      {/* Provenance */}
      <section className="px-6 py-section md:px-10">
        <div className="mx-auto grid max-w-content gap-16 md:grid-cols-2 md:gap-24">
          <Reveal>
            <dl className="divide-y divide-charcoal/10 border-y border-charcoal/10">
              {rows.map((r) => (
                <div key={r.k} className="flex items-center justify-between py-4">
                  <dt className="text-[0.72rem] uppercase tracking-[0.18em] text-charcoal/50">
                    {r.k}
                  </dt>
                  <dd className="serif text-lg text-forest">{r.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal i={1}>
            <div className="rounded-sm border border-charcoal/10 bg-ivory-dim p-10">
              <Eyebrow>This jar preserved</Eyebrow>
              <div className="mt-8 space-y-8">
                <div>
                  <span className="text-5xl font-light">
                    <Counter to={batch.acresPreserved} decimals={1} />
                  </span>
                  <p className="mt-1 text-sm text-charcoal/55">
                    acres of forest, kept standing
                  </p>
                </div>
                <div>
                  <span className="text-5xl font-light">
                    <Counter to={batch.familiesSupported} />
                  </span>
                  <p className="mt-1 text-sm text-charcoal/55">
                    tribal families, directly supported
                  </p>
                </div>
                <div>
                  <span className="text-5xl font-light">
                    <Counter to={batch.cows} />
                  </span>
                  <p className="mt-1 text-sm text-charcoal/55">
                    indigenous cows, free-grazing
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 max-w-content">
          <Link
            href="/#product"
            className="group inline-flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.18em] text-forest transition-colors hover:text-gold"
          >
            <span className="transition-transform duration-500 ease-silk group-hover:-translate-x-1">
              ←
            </span>
            Reserve a jar of your own
          </Link>
        </div>
      </section>
    </article>
  );
}
