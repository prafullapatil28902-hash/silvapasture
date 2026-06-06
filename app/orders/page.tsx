import type { Metadata } from "next";
import OrderLookup from "@/components/sections/OrderLookup";

export const metadata: Metadata = {
  title: "Track Your Order — Silvapasture",
  description: "Follow the passage of your jar — from churn to your door.",
};

export default function OrdersPage() {
  return <OrderLookup />;
}
