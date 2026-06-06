export type GrazingUpdate = {
  date: string;
  area: string;
  note: string;
};

export type HealthIndicator = {
  label: string;
  value: string;
  /** 0–100 for the ring meter */
  score: number;
};

export type Cow = {
  id: string;
  name: string;
  breed: string;
  age: string;
  village: string;
  region: string;
  grazingArea: string;
  /** stylised map position in % (left, top) */
  coords: { x: number; y: number };
  tagline: string;
  personality: string;
  knownFor: string;
  story: string[];
  hero: string;
  gallery: string[];
  health: {
    status: "Thriving" | "Healthy" | "Resting";
    lastCheck: string;
    vet: string;
    indicators: HealthIndicator[];
  };
  grazingUpdates: GrazingUpdate[];
  batchIds: string[];
  /** Founders Reserve */
  annualAllocationJars: number;
  reservedJars: number;
  adoptedBy?: string;
};

export const cows: Record<string, Cow> = {
  "kamadhenu": {
    id: "kamadhenu",
    name: "Kamadhenu",
    breed: "Gir",
    age: "7 years",
    village: "Athgarh",
    region: "Eastern Ghats, Odisha",
    grazingArea: "Sal-forest fringe, north meadow",
    coords: { x: 38, y: 44 },
    tagline: "The matriarch of the north meadow.",
    personality: "Calm, nurturing, protective.",
    knownFor: "Leading the herd out to the morning graze.",
    story: [
      "Kamadhenu was born into the Munda family's herd on a monsoon morning and has never known a stall. She grazes free across the sal-forest fringe, choosing from more than forty native grasses and herbs as the seasons turn.",
      "Her milk is gathered only after her calf has drunk its fill — the calf-first principle the village has kept for generations. What remains becomes a small, fragrant yield of bilona ghee, hand-churned by the rhythm of the dawn.",
    ],
    hero: "/cows/kamadhenu.webp",
    gallery: ["/cows/kamadhenu.webp", "/journal/forest-graze.webp", "/journal/our-story.webp"],
    health: {
      status: "Thriving",
      lastCheck: "2 June 2026",
      vet: "Dr. Sunita Pradhan",
      indicators: [
        { label: "Body condition", value: "Excellent", score: 92 },
        { label: "Grazing hours / day", value: "8.5 hrs", score: 85 },
        { label: "Forage diversity", value: "42 species", score: 96 },
      ],
    },
    grazingUpdates: [
      { date: "4 June 2026", area: "North meadow", note: "Grazed the herb-rich eastern slope after early rain — calm and content." },
      { date: "1 June 2026", area: "Sal-forest fringe", note: "Shade-resting through midday heat; full health check passed." },
      { date: "28 May 2026", area: "River grassland", note: "Led the herd to the seasonal grassland along the stream." },
    ],
    batchIds: ["SP-0042"],
    annualAllocationJars: 120,
    reservedJars: 86,
  },
  "surabhi": {
    id: "surabhi",
    name: "Surabhi",
    breed: "Gir",
    age: "5 years",
    village: "Koraput",
    region: "Eastern Ghats, Odisha",
    grazingArea: "Upland terraces, full-moon pasture",
    coords: { x: 62, y: 58 },
    tagline: "Churned by the rhythm of the full moon.",
    personality: "Curious, spirited, affectionate.",
    knownFor: "Seeking out the sweetest grasses on the high terraces.",
    story: [
      "Surabhi roams the upland terraces above Koraput, where the air is cooler and the grasses sweeter. The Paraja family say her ghee carries the scent of the hills.",
      "Her finest batches are churned on the full moon — a tradition the village believes yields the most fragrant ghee of the season.",
    ],
    hero: "/cows/surabhi.webp",
    gallery: ["/cows/surabhi.webp", "/journal/full-moon.webp", "/journal/forest-graze.webp"],
    health: {
      status: "Healthy",
      lastCheck: "30 May 2026",
      vet: "Dr. Sunita Pradhan",
      indicators: [
        { label: "Body condition", value: "Very good", score: 88 },
        { label: "Grazing hours / day", value: "8 hrs", score: 82 },
        { label: "Forage diversity", value: "38 species", score: 90 },
      ],
    },
    grazingUpdates: [
      { date: "3 June 2026", area: "Upland terraces", note: "Browsing the terrace edges; bright and alert." },
      { date: "27 May 2026", area: "Full-moon pasture", note: "Full-moon churn batch drawn — exceptionally aromatic." },
    ],
    batchIds: ["SP-0043"],
    annualAllocationJars: 100,
    reservedJars: 41,
  },
  "nandini": {
    id: "nandini",
    name: "Nandini",
    breed: "Gir",
    age: "7 years",
    village: "Athgarh",
    region: "Eastern Ghats, Odisha",
    grazingArea: "South grassland, banyan grove",
    coords: { x: 30, y: 66 },
    tagline: "The gentle keeper of the banyan grove.",
    personality: "Gentle, patient, watchful.",
    knownFor: "Keeping the youngest calves close in the grove.",
    story: [
      "Nandini favours the old banyan grove at the village's southern edge, where the herd gathers in the heat of the afternoon.",
      "Quiet and unhurried, she embodies the house's belief that nothing worth keeping should ever be rushed.",
    ],
    hero: "/cows/nandini.webp",
    gallery: ["/cows/nandini.webp", "/journal/calf.webp", "/journal/our-story.webp"],
    health: {
      status: "Resting",
      lastCheck: "29 May 2026",
      vet: "Dr. Sunita Pradhan",
      indicators: [
        { label: "Body condition", value: "Good", score: 84 },
        { label: "Grazing hours / day", value: "7 hrs", score: 78 },
        { label: "Forage diversity", value: "36 species", score: 88 },
      ],
    },
    grazingUpdates: [
      { date: "2 June 2026", area: "Banyan grove", note: "Resting in the grove shade; gentle as ever." },
      { date: "26 May 2026", area: "South grassland", note: "Grazed the southern grassland through the morning." },
    ],
    batchIds: [],
    annualAllocationJars: 90,
    reservedJars: 12,
  },
};

export const cowList = Object.values(cows);
export const defaultCowId = "kamadhenu";
