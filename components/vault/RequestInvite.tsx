"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RequestInvite() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [referral, setReferral] = useState("");

  const valid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);

  return (
    <div className="mx-auto max-w-xl">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[3px] border border-gold/25 bg-ivory/[0.04] p-10 text-center backdrop-blur-md"
          >
            <span className="text-[0.7rem] uppercase tracking-[0.25em] text-gold">
              Request received
            </span>
            <h3 className="serif mt-4 text-3xl text-ivory">
              Your name is on the list.
            </h3>
            <p className="mt-4 text-ivory/65">
              The vault admits a small number each season. Should a place open,
              our concierge will write to you privately — never publicly.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (valid) setSent(true);
            }}
            className="rounded-[3px] border border-ivory/10 bg-ivory/[0.04] p-8 backdrop-blur-md md:p-10"
          >
            <div className="space-y-7">
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
              <Field label="Referred by (optional)">
                <input
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                  placeholder="A member's name, if you have one"
                  className="reserve-input"
                />
              </Field>
            </div>
            <button
              type="submit"
              disabled={!valid}
              className="mt-9 w-full border border-gold/50 px-8 py-4 text-[0.8rem] uppercase tracking-[0.18em] text-ivory transition-all duration-500 ease-silk hover:border-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Request Invitation
            </button>
            <p className="mt-4 text-center text-xs text-ivory/40">
              Admission is considered, never guaranteed. We keep the circle small
              on purpose.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
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
