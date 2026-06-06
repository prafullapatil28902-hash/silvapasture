import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const layers = [
  { n: "01", h: "The Outer Case", d: "A matte, forest-dark box, foil-stamped with the floral seal." },
  { n: "02", h: "Forest-Paper Wrap", d: "Seed-embedded paper you can plant — it returns to the forest." },
  { n: "03", h: "The Wax Seal", d: "An antique-gold wax seal, broken only once, by you." },
  { n: "04", h: "The Jar", d: "The matte jar, cradled in a bed of natural fibre." },
];

export default function TheArrival() {
  return (
    <section
      id="arrival"
      className="relative overflow-hidden bg-obsidian px-6 py-section text-ivory md:px-10"
    >
      <div className="grain" />
      <div className="relative mx-auto max-w-content">
        <div className="max-w-prose">
          <Reveal>
            <Eyebrow>The Arrival</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 className="serif mt-7 text-[clamp(2rem,4.5vw,3.8rem)] font-light leading-tight">
              Unhurried, even in arrival.
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="mt-6 text-lg leading-relaxed text-ivory/70">
              The jar arrives as a quiet ceremony. Layer by layer, the forest
              unfolds in your hands — designed to be opened slowly, and gifted
              without a word.
            </p>
          </Reveal>
        </div>

        {/* Cinematic unboxing film */}
        <Reveal i={1}>
          <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-[3px] border border-gold/15 shadow-[0_50px_140px_-40px_rgba(0,0,0,0.9)]">
            {/* Swap /forest.mp4 for a dedicated /unboxing.mp4 when the film is ready. */}
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/product-hero.webp"
            >
              <source src="/forest.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-5 left-6">
              <span className="text-[0.65rem] uppercase tracking-[0.25em] text-ivory/70">
                The Arrival · a film
              </span>
            </div>
          </div>
        </Reveal>

        {/* Packaging layers */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-[3px] border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {layers.map((l, i) => (
            <Reveal key={l.n} i={i}>
              <div className="h-full bg-obsidian p-7">
                <span className="serif text-2xl text-gold-bright">{l.n}</span>
                <h3 className="serif mt-3 text-xl">{l.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/60">
                  {l.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal i={2}>
          <p className="serif mx-auto mt-14 max-w-2xl text-center text-xl italic text-ivory/70">
            Arriving in a Founders gift case from this season&apos;s yield.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
