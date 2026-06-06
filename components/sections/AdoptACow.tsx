import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { cowList } from "@/lib/data/cows";

export default function AdoptACow() {
  return (
    <section id="herd" className="bg-forest px-6 py-section text-ivory md:px-10">
      <div className="grain" />
      <div className="relative mx-auto max-w-content">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-prose">
            <Reveal>
              <Eyebrow>Cow Adoption</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <h2 className="serif mt-7 text-[clamp(2rem,4vw,3.6rem)] font-light leading-tight">
                Every jar has a name behind it.
              </h2>
            </Reveal>
            <Reveal i={2}>
              <p className="mt-6 text-lg leading-relaxed text-ivory/70">
                You do not buy a product. You adopt an indigenous cow — and
                receive her forest, her village and her yield. Follow her
                grazing, her health and her batches, season after season.
              </p>
            </Reveal>
          </div>
          <Reveal i={2}>
            <Button href="/cows" variant="text">
              Meet the herd
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cowList.slice(0, 3).map((cow, i) => (
            <Reveal key={cow.id} i={i}>
              <Link
                href={`/cows/${cow.id}`}
                data-hover
                className="group block overflow-hidden rounded-[3px] border border-ivory/10 bg-ivory/[0.03] backdrop-blur-md transition-colors duration-500 hover:border-gold/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cow.hero}
                    alt={cow.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] ease-silk group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                    {cow.breed} · {cow.village}
                  </span>
                  <h3 className="serif mt-1 text-2xl">{cow.name}</h3>
                  <p className="serif mt-1 text-sm italic text-ivory/65">
                    {cow.tagline}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
