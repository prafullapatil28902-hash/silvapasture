export type Batch = {
  id: string;
  cowId: string;
  village: string;
  region: string;
  productionDate: string;
  herd: string;
  cows: number;
  churnedBy: string;
  moonPhase: string;
  bilonaBatch: string;
  yieldJars: number;
  acresPreserved: number;
  familiesSupported: number;
  orderId?: string;
  notes: string;
};

export const batches: Record<string, Batch> = {
  "SP-0042": {
    id: "SP-0042",
    cowId: "kamadhenu",
    village: "Athgarh",
    region: "Eastern Ghats, Odisha",
    productionDate: "12 April 2026",
    herd: "Native Gir",
    cows: 38,
    churnedBy: "The Munda family collective",
    moonPhase: "Waxing gibbous",
    bilonaBatch: "BIL-Apr-07",
    yieldJars: 240,
    acresPreserved: 0.3,
    familiesSupported: 4,
    orderId: "ORD-1042",
    notes:
      "Churned at dawn over three unhurried hours. Forest grazing across 42 native grasses and herbs the week prior.",
  },
  "SP-0043": {
    id: "SP-0043",
    cowId: "surabhi",
    village: "Koraput",
    region: "Eastern Ghats, Odisha",
    productionDate: "27 April 2026",
    herd: "Native Sahiwal",
    cows: 31,
    churnedBy: "The Paraja family collective",
    moonPhase: "Full moon",
    bilonaBatch: "BIL-Apr-12",
    yieldJars: 198,
    acresPreserved: 0.4,
    familiesSupported: 3,
    orderId: "ORD-1043",
    notes:
      "A full-moon churn — traditionally believed to yield the most fragrant ghee of the season.",
  },
};

export const defaultBatchId = "SP-0042";
