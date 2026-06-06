"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";

const PRICE = 4800;

export default function ReserveFlow() {
  const [step, setStep] = useState<"form" | "done">("form");
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const acres = (qty * 0.3).toFixed(1);
  const valid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <div className="mx-auto grid min-h-screen max-w-content grid-cols-1 lg:grid-cols-2">
        {/* Visual side */}
        <div className="relative hidden lg:block">
          <Image
            src="/product-hero.webp"
            alt="Silvapasture Bilona Ghee"
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/30 to-obsidian/80" />
          <blockquote className="absolute bottom-12 left-12 right-12">
            <p className="serif text-2xl italic leading-snug text-ivory/90">
              “When nothing is forced, purity does not need to be created — it
              simply remains.”
            </p>
          </blockquote>
        </div>

        {/* Flow side */}
        <div className="flex flex-col justify-center px-6 py-28 md:px-14">
          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Eyebrow>Reservation</Eyebrow>
                <h1 className="serif mt-6 text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-tight">
                  Reserve from a single season
                </h1>
                <p className="mt-4 max-w-md text-ivory/65">
                  Production is finite and seasonal. A reservation secures your
                  allocation and your share of the ecosystem it preserves.
                </p>

                <div className="mt-10 space-y-7">
                  <Field label="Full name">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="reserve-input"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="reserve-input"
                    />
                  </Field>
                  <Field label="Jars (250 ml each)">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-5 border border-ivory/20 px-5 py-3">
                        <button
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          className="serif text-2xl leading-none text-gold transition-opacity hover:opacity-70"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="serif w-6 text-center text-xl">
                          {qty}
                        </span>
                        <button
                          onClick={() => setQty((q) => Math.min(6, q + 1))}
                          className="serif text-2xl leading-none text-gold transition-opacity hover:opacity-70"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-ivory/50">
                        Max 6 per season
                      </span>
                    </div>
                  </Field>
                </div>

                <div className="mt-10 flex items-end justify-between border-t border-ivory/10 pt-6">
                  <div>
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] text-ivory/50">
                      Reservation total
                    </span>
                    <p className="serif mt-1 text-3xl text-gold-bright">
                      ₹ {(PRICE * qty).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <span className="text-sm text-ivory/55">
                    preserves ~{acres} acres
                  </span>
                </div>

                <button
                  disabled={!valid}
                  onClick={() => setStep("done")}
                  className="mt-8 w-full bg-ivory px-8 py-4 text-[0.8rem] uppercase tracking-[0.18em] text-forest transition-all duration-500 ease-silk hover:bg-gold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Confirm Reservation
                </button>
                <p className="mt-4 text-center text-xs text-ivory/40">
                  No payment is taken now. Our concierge confirms each
                  reservation personally.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Eyebrow>Reserved</Eyebrow>
                <h1 className="serif mt-6 text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-tight">
                  Thank you, {name.split(" ")[0]}.
                </h1>
                <p className="mt-4 max-w-md text-ivory/65">
                  Your allocation of{" "}
                  <span className="text-ivory">
                    {qty} jar{qty > 1 ? "s" : ""}
                  </span>{" "}
                  is held. A note from our concierge is on its way to{" "}
                  <span className="text-ivory">{email}</span>.
                </p>

                <div className="mt-10 rounded-sm border border-ivory/10 bg-obsidian-soft p-8">
                  <span className="text-[0.7rem] uppercase tracking-[0.22em] text-gold">
                    Your impact receipt
                  </span>
                  <ul className="mt-6 space-y-4 text-sm">
                    <ReceiptRow k="Forest preserved" v={`${acres} acres`} />
                    <ReceiptRow
                      k="Families supported"
                      v={`${Math.max(1, Math.round(qty * 0.5))}`}
                    />
                    <ReceiptRow k="Indigenous cows protected" v={`${qty * 2}`} />
                    <ReceiptRow k="Batch" v="SP-0042 · Athgarh" />
                  </ul>
                </div>

                <div className="mt-10 flex flex-wrap gap-5">
                  <Link
                    href="/trace/SP-0042"
                    className="border border-gold/50 px-8 py-4 text-[0.8rem] uppercase tracking-[0.18em] text-ivory transition-all duration-500 ease-silk hover:border-gold hover:bg-gold/10"
                  >
                    Trace your batch
                  </Link>
                  <Link
                    href="/"
                    className="px-8 py-4 text-[0.8rem] uppercase tracking-[0.18em] text-ivory/70 transition-colors hover:text-ivory"
                  >
                    Return home →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-ivory/50">
        {label}
      </span>
      <div className="mt-3">{children}</div>
    </label>
  );
}

function ReceiptRow({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex items-center justify-between border-b border-ivory/10 pb-3">
      <span className="text-ivory/55">{k}</span>
      <span className="serif text-lg text-ivory">{v}</span>
    </li>
  );
}
