"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { orders } from "@/lib/data/orders";
import Eyebrow from "@/components/ui/Eyebrow";
import Glass from "@/components/ui/Glass";

export default function OrderLookup() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const recent = Object.values(orders);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const key = id.trim().toUpperCase();
    if (orders[key]) {
      router.push(`/orders/${key}`);
    } else {
      setError("We could not find that order. Please check the reference.");
    }
  }

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="relative mx-auto flex min-h-screen max-w-content flex-col justify-center px-6 py-32 md:px-10">
        <div className="mx-auto w-full max-w-xl">
          <Eyebrow>Order Tracking</Eyebrow>
          <h1 className="serif mt-7 text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.05]">
            Follow the passage
            <br />
            <span className="italic text-gold-bright">of your jar.</span>
          </h1>
          <p className="mt-5 text-ivory/65">
            Enter the reference from your confirmation — for example,{" "}
            <span className="text-ivory">ORD-1042</span>.
          </p>

          <form onSubmit={submit} className="mt-10">
            <label className="block">
              <span className="text-[0.7rem] uppercase tracking-[0.2em] text-ivory/50">
                Order reference
              </span>
              <input
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  setError("");
                }}
                placeholder="ORD-0000"
                className="reserve-input mt-3 uppercase tracking-[0.15em]"
              />
            </label>
            {error && (
              <p className="mt-3 text-sm text-gold-bright">{error}</p>
            )}
            <button
              type="submit"
              className="mt-7 w-full bg-ivory px-8 py-4 text-[0.8rem] uppercase tracking-[0.18em] text-forest transition-all duration-500 ease-silk hover:bg-gold"
            >
              Track Order
            </button>
          </form>

          <div className="mt-14">
            <span className="text-[0.7rem] uppercase tracking-[0.2em] text-ivory/40">
              Recent reservations
            </span>
            <div className="mt-4 space-y-3">
              {recent.map((o) => (
                <Link key={o.id} href={`/orders/${o.id}`}>
                  <Glass className="flex items-center justify-between p-5 transition-colors hover:border-gold/40">
                    <div>
                      <p className="serif text-xl">{o.id}</p>
                      <p className="text-sm text-ivory/55">
                        {o.customer} · {o.destination}
                      </p>
                    </div>
                    <span className="text-[0.75rem] uppercase tracking-[0.18em] text-gold/80">
                      {o.steps[o.current].label}
                    </span>
                  </Glass>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
