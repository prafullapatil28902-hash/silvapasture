export type OrderStep = {
  label: "Order Confirmed" | "Crafted" | "Packed" | "Dispatched" | "Delivered";
  date: string | null;
  note: string;
};

export type Order = {
  id: string;
  placed: string;
  customer: string;
  cowId: string;
  batchId: string;
  jars: number;
  /** index of the step currently reached (0-based) */
  current: number;
  steps: OrderStep[];
  destination: string;
  courier: string;
};

const baseSteps = (
  dates: (string | null)[],
  notes: string[]
): OrderStep[] => {
  const labels: OrderStep["label"][] = [
    "Order Confirmed",
    "Crafted",
    "Packed",
    "Dispatched",
    "Delivered",
  ];
  return labels.map((label, i) => ({
    label,
    date: dates[i] ?? null,
    note: notes[i],
  }));
};

export const orders: Record<string, Order> = {
  "ORD-1042": {
    id: "ORD-1042",
    placed: "8 April 2026",
    customer: "Ananya Rao",
    cowId: "kamadhenu",
    batchId: "SP-0042",
    jars: 2,
    current: 3,
    destination: "Bengaluru, Karnataka",
    courier: "Silvapasture Concierge · Blue Dart",
    steps: baseSteps(
      ["8 April 2026", "12 April 2026", "15 April 2026", "16 April 2026", null],
      [
        "Your reservation was confirmed by our concierge.",
        "Hand-churned from Kamadhenu's batch by the Munda family.",
        "Sealed and nested in its forest-paper packaging.",
        "On its way with the courier — tracking shared by email.",
        "Arriving soon. The Arrival awaits.",
      ]
    ),
  },
  "ORD-1043": {
    id: "ORD-1043",
    placed: "24 April 2026",
    customer: "Vikram Mehta",
    cowId: "surabhi",
    batchId: "SP-0043",
    jars: 1,
    current: 4,
    destination: "Mumbai, Maharashtra",
    courier: "Silvapasture Concierge · Blue Dart",
    steps: baseSteps(
      ["24 April 2026", "27 April 2026", "30 April 2026", "1 May 2026", "4 May 2026"],
      [
        "Your reservation was confirmed by our concierge.",
        "Hand-churned from Surabhi's full-moon batch.",
        "Sealed and nested in its forest-paper packaging.",
        "Dispatched with the courier.",
        "Delivered. We hope The Arrival was worthy of the wait.",
      ]
    ),
  },
};

export const defaultOrderId = "ORD-1042";
