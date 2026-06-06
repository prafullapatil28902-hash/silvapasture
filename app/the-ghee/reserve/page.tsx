import type { Metadata } from "next";
import ReserveFlow from "@/components/sections/ReserveFlow";

export const metadata: Metadata = {
  title: "Reserve a Jar — Silvapasture",
  description:
    "Reserve from a single, finite season of Silvapasture bilona ghee. Each jar preserves a measured share of forest, herd and community.",
};

export default function ReservePage() {
  return <ReserveFlow />;
}
