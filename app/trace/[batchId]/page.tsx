import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { batches } from "@/lib/data/batches";
import { cows } from "@/lib/data/cows";
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
  const cow = cows[batch.cowId];

  const rows = [
    { k: "Batch Number", v: batch.id },
    { k: "Village", v: batch.village },
    { k: "Region", v: batch.region },
    { k: "Production Date", v: batch.productionDate },
    { k: "Herd", v: `${batch.herd} · ${batch.cows} cows` },
    { k: "Churned By", v: batch.churnedBy },
    { k: "Bilona Batch", v: batch.bilonaBatch },
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

          {cow && (
            <Link
              href={`/cows/${cow.id}`}
              data-hover
              className="group mt-10 flex items-center gap-5 rounded-[3px] border border-ivory/10 bg-ivory/[0.04] p-4 backdrop-blur-md transition-colors hover:border-gold/40 sm:max-w-md"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[3px]">
                <Image
                  src={cow.hero}
                  alt={cow.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                  This batch came from Cow
                </span>
                <p className="serif text-2xl leading-tight">{cow.name}</p>
                <p className="truncate text-sm text-ivory/55">
                  {cow.breed} · {cow.village}
                </p>
              </div>
              <span className="ml-auto pr-2 text-[0.8rem] uppercase tracking-[0.18em] text-ivory/60 transition-colors group-hover:text-gold">
                →
              </span>
            </Link>
          )}
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

            <div className="mt-8 flex items-center gap-5">
              <div className="rounded-[3px] border border-charcoal/10 bg-ivory p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/qr/batch-${batch.id}.svg`}
                  alt={`Scan to trace batch ${batch.id}`}
                  width={92}
                  height={92}
                />
              </div>
              <div>
                <p className="serif text-lg text-forest">
                  The hallmark on your jar
                </p>
                <p className="mt-1 text-sm text-charcoal/55">
                  Scan the seal to return to this exact page.
                </p>
              </div>
            </div>
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

        <div className="mx-auto mt-16 flex max-w-content flex-wrap gap-x-10 gap-y-4">
          {cow && (
            <Link
              href={`/cows/${cow.id}`}
              className="group inline-flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.18em] text-forest transition-colors hover:text-gold"
            >
              Follow {cow.name}
              <span className="transition-transform duration-500 ease-silk group-hover:translate-x-1">
                →
              </span>
            </Link>
          )}
          {batch.orderId && (
            <Link
              href={`/orders/${batch.orderId}`}
              className="group inline-flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.18em] text-forest transition-colors hover:text-gold"
            >
              Track an order from this batch
              <span className="transition-transform duration-500 ease-silk group-hover:translate-x-1">
                →
              </span>
            </Link>
          )}
          <Link
            href="/the-ghee/reserve"
            className="group inline-flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.18em] text-forest transition-colors hover:text-gold"
          >
            Reserve a jar of your own
            <span className="transition-transform duration-500 ease-silk group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </article>
  );
}
