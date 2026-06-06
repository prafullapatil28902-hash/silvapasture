export type VaultCollection = {
  id: string;
  name: string;
  cadence: string;
  descriptor: string;
  image: string;
  total: number;
  claimed: number;
  status: "Closed" | "Waitlist" | "Allocating";
};

export const vault = {
  /** Next release moment (ISO). The vault is "currently closed" until then. */
  nextRelease: "2026-07-10T05:30:00+05:30",
  releaseName: "The Full Moon Reserve · Summer Yield",
  collections: [
    {
      id: "full-moon",
      name: "Full Moon Reserve",
      cadence: "Released only on the full moon",
      descriptor:
        "Churned beneath the full moon, when the village believes the ghee is at its most fragrant. A single lunar batch, never repeated.",
      image: "/vault/relic-2.webp",
      total: 120,
      claimed: 86,
      status: "Waitlist",
    },
    {
      id: "founders",
      name: "Founder's Reserve",
      cadence: "Annual · by invitation",
      descriptor:
        "The first and finest draw of the season, set aside for the founding circle before any jar is offered publicly.",
      image: "/vault/relic.webp",
      total: 60,
      claimed: 60,
      status: "Closed",
    },
    {
      id: "rare-batch",
      name: "Rare Batch Releases",
      cadence: "Irregular · single-village",
      descriptor:
        "Exceptional single-village, single-day churns — Heritage Batch 014, jar 132 of 500 — released without warning to the vault.",
      image: "/vault/relic.webp",
      total: 500,
      claimed: 368,
      status: "Allocating",
    },
  ] as VaultCollection[],
};
