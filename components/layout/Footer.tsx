import Eyebrow from "@/components/ui/Eyebrow";

export default function Footer() {
  return (
    <footer className="bg-forest-deep px-6 pt-section pb-12 text-ivory md:px-10">
      <div className="mx-auto max-w-content">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="serif text-3xl tracking-[0.25em]">SILVAPASTURE</span>
            <p className="mt-6 max-w-prose text-sm leading-relaxed text-ivory/60">
              A conservation house preserving forests, indigenous herds and the
              bilona tradition. The ghee is the artefact. The ecosystem is the
              work.
            </p>
          </div>

          {[
            { h: "Discover", l: ["Ecosystem", "The Journey", "Impact", "Journal"] },
            { h: "The House", l: ["The Ghee", "Traceability", "Founders Circle", "Concierge"] },
            { h: "Connect", l: ["Newsletter", "Instagram", "Stories", "Contact"] },
          ].map((col) => (
            <div key={col.h}>
              <Eyebrow>{col.h}</Eyebrow>
              <ul className="mt-6 space-y-3 text-sm text-ivory/70">
                {col.l.map((item) => (
                  <li key={item}>
                    <a className="transition-colors hover:text-gold" href="#">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/40 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Silvapasture. Preserved, not produced.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
