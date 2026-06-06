import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cows } from "@/lib/data/cows";
import { batches } from "@/lib/data/batches";
import Eyebrow from "@/components/ui/Eyebrow";
import Glass from "@/components/ui/Glass";
import HealthRing from "@/components/ui/HealthRing";
import VillageMap from "@/components/ui/VillageMap";

export function generateStaticParams() {
  return Object.keys(cows).map((cowId) => ({ cowId }));
}

export function generateMetadata({
  params,
}: {
  params: { cowId: string };
}): Metadata {
  const cow = cows[params.cowId];
  return {
    title: cow
      ? `${cow.name} · The Herd — Silvapasture`
      : "The Herd — Silvapasture",
  };
}

const statusTone: Record<string, string> = {
  Thriving: "text-emerald-300",
  Healthy: "text-gold-bright",
  Resting: "text-ivory/70",
};

export default function CowDashboard({
  params,
}: {
  params: { cowId: string };
}) {
  const cow = cows[params.cowId];
  if (!cow) notFound();

  const remaining = cow.annualAllocationJars - cow.reservedJars;
  const pct = Math.round((cow.reservedJars / cow.annualAllocationJars) * 100);
  const cowBatches = cow.batchIds.map((id) => batches[id]).filter(Boolean);

  return (
    <div className="relative bg-obsidian text-ivory">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />

      {/* Hero band */}
      <header className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-content">
          <Link
            href="/cows"
            className="group inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-ivory/60 transition-colors hover:text-gold"
          >
            <span className="transition-transform duration-500 ease-silk group-hover:-translate-x-1">
              ←
            </span>
            The Herd
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] border border-ivory/10">
              <Image
                src={cow.hero}
                alt={cow.name}
                fill
                sizes="(max-width:1024px) 100vw, 55vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
              <span
                className={`absolute right-5 top-5 rounded-full border border-ivory/15 bg-obsidian/60 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.18em] backdrop-blur-sm ${statusTone[cow.health.status]}`}
              >
                ● {cow.health.status}
              </span>
            </div>

            <div>
              <Eyebrow>
                Adopted Cow · {cow.breed} · {cow.age}
              </Eyebrow>
              <h1 className="serif mt-5 text-[clamp(2.6rem,6vw,5.2rem)] font-light leading-[1]">
                {cow.name}
              </h1>
              <p className="serif mt-3 text-xl italic text-gold-bright">
                {cow.tagline}
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <Meta k="Village" v={cow.village} />
                <Meta k="Region" v={cow.region} />
                <Meta k="Grazing area" v={cow.grazingArea} />
                <Meta k="Last health check" v={cow.health.lastCheck} />
              </dl>

              <div className="mt-8 flex items-center gap-4">
                <div className="rounded-[3px] border border-ivory/15 bg-ivory p-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/qr/cow-${cow.id}.svg`}
                    alt={`Scan to follow ${cow.name}`}
                    width={76}
                    height={76}
                  />
                </div>
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-gold">
                    Scan to follow
                  </p>
                  <p className="serif text-lg text-ivory">
                    The seal on every {cow.name} jar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard grid */}
      <section className="relative px-6 pb-section md:px-10">
        <div className="mx-auto grid max-w-content gap-6 lg:grid-cols-3">
          {/* Story */}
          <Glass className="p-8 lg:col-span-2">
            <Eyebrow>Her Story</Eyebrow>
            <div className="mt-5 space-y-4">
              {cow.story.map((p, i) => (
                <p key={i} className="leading-relaxed text-ivory/75">
                  {p}
                </p>
              ))}
            </div>
            <dl className="mt-7 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-ivory/10 pt-7">
              <Meta k="Personality" v={cow.personality} />
              <Meta k="Known for" v={cow.knownFor} />
            </dl>
          </Glass>

          {/* Health */}
          <Glass className="p-8">
            <Eyebrow>Health Status</Eyebrow>
            <p className="mt-4 text-sm text-ivory/60">
              Reviewed by {cow.health.vet}
            </p>
            <div className="mt-6 space-y-7">
              {cow.health.indicators.map((ind) => (
                <div
                  key={ind.label}
                  className="flex items-center gap-5"
                >
                  <HealthRing score={ind.score} size={84} label="" value="" />
                  <div>
                    <p className="serif text-lg text-ivory">{ind.value}</p>
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory/45">
                      {ind.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Glass>

          {/* Latest photos */}
          <Glass className="p-8 lg:col-span-2">
            <Eyebrow>Latest Photos</Eyebrow>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {cow.gallery.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-[3px]"
                >
                  <Image
                    src={src}
                    alt={`${cow.name} grazing`}
                    fill
                    sizes="(max-width:768px) 33vw, 220px"
                    className="object-cover transition-transform duration-700 ease-silk hover:scale-105"
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/40">
              Field imagery from the village collective
            </p>
          </Glass>

          {/* Village map */}
          <Glass className="p-8">
            <Eyebrow>Village Location</Eyebrow>
            <div className="mt-5">
              <VillageMap
                x={cow.coords.x}
                y={cow.coords.y}
                village={cow.village}
                region={cow.region}
                area={cow.grazingArea}
              />
            </div>
          </Glass>

          {/* Grazing updates */}
          <Glass className="p-8 lg:col-span-2">
            <Eyebrow>Grazing Updates</Eyebrow>
            <ul className="mt-6 space-y-6">
              {cow.grazingUpdates.map((u, i) => (
                <li key={i} className="grid grid-cols-[auto_1fr] gap-x-5">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gold" />
                    {i < cow.grazingUpdates.length - 1 && (
                      <span className="mt-1 w-px flex-1 bg-ivory/12" />
                    )}
                  </div>
                  <div className="pb-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <span className="serif text-lg text-ivory">{u.area}</span>
                      <span className="text-[0.7rem] uppercase tracking-[0.18em] text-gold/80">
                        {u.date}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ivory/60">{u.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Glass>

          {/* Founders Reserve */}
          <Glass className="flex flex-col p-8">
            <Eyebrow>Founders Reserve</Eyebrow>
            <p className="mt-4 text-sm text-ivory/65">
              Reserve future production from {cow.name} for the coming season.
            </p>
            <div className="mt-7">
              <div className="flex items-baseline justify-between">
                <span className="serif text-3xl text-gold-bright">
                  {remaining}
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory/45">
                  of {cow.annualAllocationJars} jars left
                </span>
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ivory/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-gold-bright"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/40">
                {pct}% of this year's allocation reserved
              </p>
            </div>
            <Link
              href={`/the-ghee/reserve?cow=${cow.id}`}
              className="mt-auto inline-flex justify-center border border-gold/50 px-8 py-4 text-[0.8rem] uppercase tracking-[0.18em] text-ivory transition-all duration-500 ease-silk hover:border-gold hover:bg-gold/10"
            >
              {remaining > 0 ? `Reserve from ${cow.name}` : "Join the waitlist"}
            </Link>
          </Glass>

          {/* Linked batches */}
          <Glass className="p-8 lg:col-span-3">
            <Eyebrow>Ghee Batches from {cow.name}</Eyebrow>
            {cowBatches.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {cowBatches.map((b) => (
                  <Link
                    key={b.id}
                    href={`/trace/${b.id}`}
                    data-hover
                    className="group flex items-center justify-between rounded-[3px] border border-ivory/10 bg-ivory/[0.03] p-6 transition-colors hover:border-gold/40"
                  >
                    <div>
                      <p className="serif text-2xl text-ivory">
                        Batch {b.id}
                      </p>
                      <p className="mt-1 text-sm text-ivory/55">
                        {b.productionDate} · Bilona {b.bilonaBatch} ·{" "}
                        {b.moonPhase}
                      </p>
                    </div>
                    <span className="text-[0.8rem] uppercase tracking-[0.18em] text-ivory/60 transition-colors group-hover:text-gold">
                      Trace →
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-5 serif text-lg italic text-ivory/60">
                {cow.name}&apos;s first batch is still grazing its way to the
                churn. Reserve now to claim it.
              </p>
            )}
          </Glass>
        </div>
      </section>
    </div>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory/45">
        {k}
      </dt>
      <dd className="serif mt-1 text-lg text-ivory">{v}</dd>
    </div>
  );
}
