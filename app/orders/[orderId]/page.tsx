import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { orders } from "@/lib/data/orders";
import { cows } from "@/lib/data/cows";
import { batches } from "@/lib/data/batches";
import Eyebrow from "@/components/ui/Eyebrow";
import Glass from "@/components/ui/Glass";
import OrderTimeline from "@/components/ui/OrderTimeline";

export function generateStaticParams() {
  return Object.keys(orders).map((orderId) => ({ orderId }));
}

export function generateMetadata({
  params,
}: {
  params: { orderId: string };
}): Metadata {
  const o = orders[params.orderId.toUpperCase()];
  return {
    title: o ? `Order ${o.id} — Silvapasture` : "Order — Silvapasture",
  };
}

export default function OrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  const order = orders[params.orderId.toUpperCase()];
  if (!order) notFound();
  const cow = cows[order.cowId];
  const batch = batches[order.batchId];

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />

      <header className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-content">
          <Eyebrow>Order Tracking</Eyebrow>
          <h1 className="serif mt-7 text-[clamp(2.4rem,6vw,4.6rem)] font-light leading-[1.02]">
            Order <span className="italic text-gold-bright">{order.id}</span>
          </h1>
          <p className="serif mt-4 max-w-xl text-lg italic text-ivory/75">
            {order.jars} jar{order.jars > 1 ? "s" : ""} for {order.customer},
            bound for {order.destination}.
          </p>
        </div>
      </header>

      <section className="relative px-6 pb-section md:px-10">
        <div className="mx-auto grid max-w-content gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Timeline */}
          <Glass className="p-8 md:p-12">
            <Eyebrow>The Passage of Your Jar</Eyebrow>
            <div className="mt-10">
              <OrderTimeline steps={order.steps} current={order.current} />
            </div>
            <div className="mt-10 border-t border-ivory/10 pt-6 text-sm text-ivory/55">
              <div className="flex flex-wrap justify-between gap-4">
                <span>Placed {order.placed}</span>
                <span>{order.courier}</span>
              </div>
            </div>
          </Glass>

          {/* Side: provenance links */}
          <div className="space-y-6">
            {cow && (
              <Glass className="overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={cow.hero}
                    alt={cow.name}
                    fill
                    sizes="(max-width:1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                      Crafted from
                    </span>
                    <p className="serif text-2xl">{cow.name}</p>
                  </div>
                </div>
                <div className="p-6">
                  <Link
                    href={`/cows/${cow.id}`}
                    className="text-[0.8rem] uppercase tracking-[0.18em] text-ivory/70 transition-colors hover:text-gold"
                  >
                    View her dashboard →
                  </Link>
                </div>
              </Glass>
            )}

            {batch && (
              <Glass className="p-6">
                <Eyebrow>Traceability</Eyebrow>
                <p className="serif mt-4 text-2xl">Batch {batch.id}</p>
                <p className="mt-1 text-sm text-ivory/55">
                  {batch.productionDate} · Bilona {batch.bilonaBatch}
                </p>
                <Link
                  href={`/trace/${batch.id}`}
                  className="mt-5 inline-block text-[0.8rem] uppercase tracking-[0.18em] text-ivory/70 transition-colors hover:text-gold"
                >
                  Open full provenance →
                </Link>
              </Glass>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
