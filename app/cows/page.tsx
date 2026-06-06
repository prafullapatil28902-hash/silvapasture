import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cowList } from "@/lib/data/cows";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Herd Book — Meet the Herd · Silvapasture",
  description:
    "Meet the indigenous cows behind every jar. Each is named, known and free-grazing — adopt one and follow her life, season after season.",
};

export default function HerdBook() {
  return (
    <div className="bg-ivory">
      {/* Masthead */}
      <header className="bg-forest px-6 pb-20 pt-36 text-ivory md:px-10 md:pt-44">
        <div className="mx-auto max-w-content">
          <Eyebrow>The Herd Book</Eyebrow>
          <h1 className="serif mt-7 text-[clamp(2.6rem,7vw,6rem)] font-light leading-[1]">
            Meet the Herd
          </h1>
          <p className="serif mt-5 max-w-xl text-xl italic text-ivory/75">
            Every jar carries a name. These are the indigenous cows behind the
            ghee — free-grazing, calf-first, and known to us each by character.
          </p>
        </div>
      </header>

      {/* Editorial profiles */}
      <section className="px-6 py-section md:px-10">
        <div className="mx-auto max-w-content space-y-24 md:space-y-36">
          {cowList.map((cow, i) => {
            const remaining = cow.annualAllocationJars - cow.reservedJars;
            const flip = i % 2 === 1;
            return (
              <Reveal key={cow.id}>
                <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                  {/* Portrait */}
                  <div className={flip ? "md:order-2" : ""}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] shadow-[0_40px_120px_-40px_rgba(15,43,32,0.5)]">
                      <Image
                        src={cow.hero}
                        alt={cow.name}
                        fill
                        sizes="(max-width:768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                      <span className="absolute bottom-5 left-5 text-[0.65rem] uppercase tracking-[0.2em] text-ivory/90">
                        {cow.breed} · {cow.age}
                      </span>
                    </div>
                  </div>

                  {/* Profile */}
                  <div className={flip ? "md:order-1" : ""}>
                    <span className="eyebrow">Cow No. {String(i + 1).padStart(2, "0")}</span>
                    <h2 className="serif mt-4 text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1] text-forest">
                      {cow.name}
                    </h2>
                    <p className="serif mt-3 text-xl italic text-gold">
                      {cow.tagline}
                    </p>

                    <p className="mt-7 max-w-prose leading-relaxed text-charcoal/75">
                      {cow.story[0]}
                    </p>

                    <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-charcoal/10 pt-8">
                      <Trait k="Personality" v={cow.personality} />
                      <Trait k="Known for" v={cow.knownFor} />
                      <Trait k="Village" v={`${cow.village}, ${cow.region}`} />
                      <Trait k="Grazing" v={cow.grazingArea} />
                    </dl>

                    <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
                      <Link
                        href={`/cows/${cow.id}`}
                        className="group inline-flex items-center gap-2 border border-forest/30 px-7 py-3.5 text-[0.78rem] uppercase tracking-[0.18em] text-forest transition-all duration-500 ease-silk hover:border-forest hover:bg-forest hover:text-ivory"
                      >
                        Track {cow.name}
                        <span className="transition-transform duration-500 ease-silk group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <span className="text-sm text-charcoal/55">
                        {remaining > 0
                          ? `${remaining} jars available this season`
                          : "Fully reserved this season"}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Trait({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[0.66rem] uppercase tracking-[0.2em] text-charcoal/45">
        {k}
      </dt>
      <dd className="serif mt-1 text-lg leading-snug text-forest">{v}</dd>
    </div>
  );
}
