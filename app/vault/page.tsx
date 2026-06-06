import type { Metadata } from "next";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import VaultCountdown from "@/components/vault/VaultCountdown";
import RequestInvite from "@/components/vault/RequestInvite";
import { vault } from "@/lib/data/vault";

export const metadata: Metadata = {
  title: "The Vault — By Invitation · Silvapasture",
  description:
    "An invite-only reserve of rare Silvapasture releases. The vault is currently closed. Request consideration for the next allocation.",
};

const statusTone: Record<string, string> = {
  Closed: "text-ivory/55 border-ivory/20",
  Waitlist: "text-gold-bright border-gold/40",
  Allocating: "text-emerald-300 border-emerald-300/30",
};

export default function VaultPage() {
  const releaseDate = new Date(vault.nextRelease).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-forest text-ivory">
      {/* ── Hero / Closed state ─────────────────────────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 md:px-10">
        <div className="absolute inset-0">
          <Image
            src="/vault/relic.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-forest/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-forest/60" />
        </div>
        <div className="grain" />

        <div className="relative mx-auto w-full max-w-content">
          <Eyebrow>By Invitation Only</Eyebrow>
          <h1 className="serif mt-7 text-[clamp(3rem,9vw,8rem)] font-light leading-[0.95]">
            The Vault
          </h1>
          <p className="serif mt-5 max-w-xl text-xl italic text-ivory/75">
            A private reserve of our rarest releases — held back from the world,
            opened only to a few.
          </p>

          {/* Closed state */}
          <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-forest-deep/40 px-5 py-2.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-[0.72rem] uppercase tracking-[0.22em] text-ivory/80">
              Vault Currently Closed
            </span>
          </div>

          {/* Countdown */}
          <div className="mt-12">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-ivory/45">
              Next release · {vault.releaseName}
            </p>
            <div className="mt-5">
              <VaultCountdown iso={vault.nextRelease} />
            </div>
            <p className="mt-5 text-sm text-ivory/55">
              Opens {releaseDate}. Members are admitted first.
            </p>
          </div>
        </div>
      </section>

      {/* ── Collections ─────────────────────────── */}
      <section className="relative px-6 py-section md:px-10">
        <div className="mx-auto max-w-content">
          <div className="max-w-prose">
            <Eyebrow>Limited Release Collections</Eyebrow>
            <h2 className="serif mt-7 text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight">
              Not a catalogue. A set of rare, finite moments.
            </h2>
          </div>

          <div className="mt-16 space-y-6">
            {vault.collections.map((c, i) => {
              const pct = Math.round((c.claimed / c.total) * 100);
              const remaining = c.total - c.claimed;
              return (
                <div
                  key={c.id}
                  className="group grid items-stretch gap-px overflow-hidden rounded-[3px] border border-ivory/10 bg-ivory/10 md:grid-cols-[1.1fr_1.4fr]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-forest-deep md:aspect-auto">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(max-width:768px) 100vw, 45vw"
                      className="object-cover transition-transform duration-[1.4s] ease-silk group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between bg-forest p-8 md:p-12">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <span className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">
                          {c.cadence}
                        </span>
                        <span
                          className={`rounded-full border px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] ${statusTone[c.status]}`}
                        >
                          {c.status}
                        </span>
                      </div>
                      <h3 className="serif mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-light">
                        {c.name}
                      </h3>
                      <p className="mt-4 max-w-prose leading-relaxed text-ivory/70">
                        {c.descriptor}
                      </p>
                    </div>

                    {/* Allocation counter */}
                    <div className="mt-10">
                      <div className="flex items-baseline justify-between">
                        <span className="serif text-2xl text-gold-bright">
                          {c.claimed}{" "}
                          <span className="text-ivory/40">/ {c.total}</span>
                        </span>
                        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory/50">
                          {c.status === "Closed"
                            ? "Fully allocated"
                            : `${remaining} remaining`}
                        </span>
                      </div>
                      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-ivory/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-gold to-gold-bright"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Request Invitation ─────────────────────────── */}
      <section className="relative overflow-hidden bg-forest-deep px-6 py-section md:px-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(197,164,109,0.18), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-content text-center">
          <Eyebrow className="justify-center">Request Consideration</Eyebrow>
          <h2 className="serif mx-auto mt-7 max-w-2xl text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05]">
            Ask to be let in.
          </h2>
          <p className="serif mx-auto mt-5 max-w-xl text-lg italic text-ivory/70">
            The vault does not sell. It admits. Leave your name and, should a
            place open, we will write to you.
          </p>
          <div className="mt-12">
            <RequestInvite />
          </div>
        </div>
      </section>
    </div>
  );
}
