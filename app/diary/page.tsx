import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { diary } from "@/lib/data/diary";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Ecosystem Diary — Silvapasture",
  description:
    "A members' editorial from the forest. Monthly dispatches on the herd, the seasons, the village and the living ecosystem behind every jar.",
};

export default function DiaryIndex() {
  const [feature, ...rest] = diary;

  return (
    <div className="bg-ivory">
      {/* Masthead */}
      <header className="bg-forest px-6 pb-20 pt-36 text-ivory md:px-10 md:pt-44">
        <div className="mx-auto max-w-content">
          <Eyebrow>Members' Editorial</Eyebrow>
          <h1 className="serif mt-7 text-[clamp(2.6rem,7vw,6rem)] font-light leading-[1]">
            The Ecosystem Diary
          </h1>
          <p className="serif mt-5 max-w-xl text-xl italic text-ivory/75">
            A dispatch from the forest, the herd and the village — written each
            month for those who keep this world alive.
          </p>
        </div>
      </header>

      {/* Feature entry */}
      <section className="px-6 pt-16 md:px-10">
        <div className="mx-auto max-w-content">
          <Reveal>
            <Link
              href={`/diary/${feature.slug}`}
              data-hover
              className="group grid gap-10 md:grid-cols-2 md:items-center"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                <Image
                  src={feature.hero}
                  alt={feature.title}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.6s] ease-silk group-hover:scale-105"
                  priority
                />
              </div>
              <div>
                <span className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">
                  {feature.category} · {feature.month}
                </span>
                <h2 className="serif mt-4 text-[clamp(2rem,4vw,3.6rem)] font-light leading-tight text-forest transition-colors group-hover:text-gold">
                  {feature.title}
                </h2>
                <p className="mt-5 max-w-prose text-lg leading-relaxed text-charcoal/70">
                  {feature.excerpt}
                </p>
                <span className="mt-6 inline-block text-[0.78rem] uppercase tracking-[0.18em] text-forest transition-colors group-hover:text-gold">
                  Read the entry →
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Archive grid */}
      <section className="px-6 py-section md:px-10">
        <div className="mx-auto max-w-content">
          <div className="mb-12 flex items-center gap-4">
            <span className="eyebrow">The Archive</span>
            <span className="h-px flex-1 bg-charcoal/10" />
          </div>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
            {rest.map((e, i) => (
              <Reveal key={e.slug} i={i % 3}>
                <Link href={`/diary/${e.slug}`} data-hover className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[3px]">
                    <Image
                      src={e.hero}
                      alt={e.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1.4s] ease-silk group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-forest">
                      {e.category}
                    </span>
                  </div>
                  <p className="mt-5 text-[0.68rem] uppercase tracking-[0.2em] text-charcoal/45">
                    {e.month} · {e.readingTime}
                  </p>
                  <h3 className="serif mt-2 text-2xl leading-snug text-forest transition-colors group-hover:text-gold">
                    {e.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-charcoal/60">
                    {e.excerpt}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
