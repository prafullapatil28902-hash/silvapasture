import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { diary, diaryBySlug } from "@/lib/data/diary";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export function generateStaticParams() {
  return diary.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const e = diaryBySlug[params.slug];
  return {
    title: e ? `${e.title} — The Ecosystem Diary` : "The Ecosystem Diary",
    description: e?.excerpt,
  };
}

export default function DiaryEntryPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = diaryBySlug[params.slug];
  if (!entry) notFound();

  const more = diary.filter((d) => d.slug !== entry.slug).slice(0, 3);

  return (
    <article className="bg-ivory">
      {/* Full-bleed hero */}
      <header className="relative flex h-[78vh] min-h-[520px] items-end overflow-hidden">
        <Image
          src={entry.hero}
          alt={entry.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
        <div className="relative mx-auto w-full max-w-content px-6 pb-16 text-ivory md:px-10">
          <span className="text-[0.7rem] uppercase tracking-[0.22em] text-gold">
            {entry.category} · {entry.month}
          </span>
          <h1 className="serif mt-4 max-w-4xl text-[clamp(2.4rem,6vw,5.4rem)] font-light leading-[1.02]">
            {entry.title}
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-ivory/60">
            {entry.date} · {entry.readingTime} read
          </p>
        </div>
      </header>

      {/* Body */}
      <section className="px-6 py-section md:px-10">
        <div className="mx-auto max-w-prose">
          <p className="serif text-2xl leading-relaxed text-forest">
            {entry.excerpt}
          </p>
          <div className="mt-10 space-y-7">
            {entry.content.map((p, i) => (
              <Reveal key={i} i={i}>
                <p className="text-lg leading-relaxed text-charcoal/80">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="mx-auto mt-20 max-w-content">
          <div className="mb-8 flex items-center gap-4">
            <span className="eyebrow">From the field</span>
            <span className="h-px flex-1 bg-charcoal/10" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {entry.gallery.map((src, i) => (
              <Reveal key={src + i} i={i}>
                <div
                  className={`relative overflow-hidden rounded-[3px] ${
                    i === 0 ? "md:col-span-2 aspect-[16/10]" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${entry.title} — field image ${i + 1}`}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-silk hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* More entries */}
      <section className="bg-forest px-6 py-section text-ivory md:px-10">
        <div className="mx-auto max-w-content">
          <Eyebrow>More from the Diary</Eyebrow>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {more.map((e) => (
              <Link
                key={e.slug}
                href={`/diary/${e.slug}`}
                data-hover
                className="group block"
              >
                <div className="relative aspect-[3/2] overflow-hidden rounded-[3px]">
                  <Image
                    src={e.hero}
                    alt={e.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] ease-silk group-hover:scale-105"
                  />
                </div>
                <span className="mt-4 block text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                  {e.category}
                </span>
                <h3 className="serif mt-1 text-xl leading-snug transition-colors group-hover:text-gold">
                  {e.title}
                </h3>
              </Link>
            ))}
          </div>
          <div className="mt-14">
            <Link
              href="/diary"
              className="group inline-flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.18em] text-ivory/80 transition-colors hover:text-gold"
            >
              <span className="transition-transform duration-500 ease-silk group-hover:-translate-x-1">
                ←
              </span>
              All diary entries
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
