export type DiaryEntry = {
  slug: string;
  title: string;
  date: string;
  month: string;
  category:
    | "Forest Updates"
    | "Seasonal Changes"
    | "Grazing Stories"
    | "Village Life"
    | "Biodiversity Updates"
    | "Cow Stories";
  excerpt: string;
  hero: string;
  readingTime: string;
  content: string[];
  gallery: string[];
};

export const diary: DiaryEntry[] = [
  {
    slug: "monsoon-returns-to-the-sal-forest",
    title: "The Monsoon Returns to the Sal Forest",
    date: "1 June 2026",
    month: "June 2026",
    category: "Forest Updates",
    readingTime: "6 min",
    excerpt:
      "The first rains have broken over the Eastern Ghats. Overnight, the sal forest has turned a deeper green, and the herd has moved north to the herb-rich slopes.",
    hero: "/journal/forest-graze.webp",
    content: [
      "The monsoon arrives not as a single event but as a held breath finally released. For weeks the forest waited, the grasses pale and patient. Then, on the last night of May, the rain came — and by morning the sal canopy had deepened to a green so complete it seemed to hum.",
      "With the rain comes movement. The herd, led by Kamadhenu, has shifted north to the herb-rich slopes where the new growth is sweetest. The villagers read these movements the way others read a calendar: when the cows climb, the season has truly turned.",
      "We do not manage this. We protect the conditions that allow it — the unbroken canopy, the unsprayed grass, the freedom for a herd to choose its own way. The monsoon does the rest.",
    ],
    gallery: ["/journal/forest-graze.webp", "/cows/kamadhenu.webp", "/journal/our-story.webp"],
  },
  {
    slug: "kamadhenu-leads-the-morning-graze",
    title: "Kamadhenu Leads the Morning Graze",
    date: "28 May 2026",
    month: "May 2026",
    category: "Cow Stories",
    readingTime: "5 min",
    excerpt:
      "Every dawn, the matriarch of the north meadow decides where the herd will eat. We followed her for a morning.",
    hero: "/cows/kamadhenu.webp",
    content: [
      "She is awake before the village. By the time the first light reaches the meadow, Kamadhenu has already chosen the day's direction — and the herd, without instruction, falls in behind her.",
      "At seven years, she carries the calm authority of a matriarch. The Munda family say she has never once led the herd astray; that she seems to know, weeks ahead, which slope will be richest after rain.",
      "Her milk is drawn only after her calf has drunk its fill. What remains is small, and it is everything. This is the calf-first principle, and Kamadhenu is its quiet embodiment.",
    ],
    gallery: ["/cows/kamadhenu.webp", "/cows/nandini.webp", "/journal/calf.webp"],
  },
  {
    slug: "churned-under-the-full-moon",
    title: "Churned Under the Full Moon",
    date: "12 May 2026",
    month: "May 2026",
    category: "Grazing Stories",
    readingTime: "7 min",
    excerpt:
      "In Koraput, the finest batches are churned on the full moon. Surabhi's lunar yield is the most fragrant of the season.",
    hero: "/journal/full-moon.webp",
    content: [
      "There is a belief, older than anyone in the village can trace, that ghee churned beneath the full moon is the most fragrant of all. Science is quiet on the matter. Tradition is not.",
      "Surabhi grazes the upland terraces above Koraput, where the air is cooler and the grasses sweeter. Her full-moon batch is drawn slowly, by hand, in the bidirectional rhythm of the bilona — never hurried, never mechanised.",
      "Whether it is the moon or the mountain or simply the patience, the result is undeniable: a ghee that carries the scent of the hills.",
    ],
    gallery: ["/journal/full-moon.webp", "/cows/surabhi.webp", "/journal/bilona.webp"],
  },
  {
    slug: "the-munda-familys-dawn",
    title: "The Munda Family's Dawn",
    date: "20 April 2026",
    month: "April 2026",
    category: "Village Life",
    readingTime: "6 min",
    excerpt:
      "Before the ghee, before the herd, there is a family. A morning in Athgarh with the people who keep the ecosystem whole.",
    hero: "/journal/our-story.webp",
    content: [
      "The day begins in the dark. By the time we arrive, the fire is already lit and the churn is already turning, and the conversation is the easy, unhurried kind that only comes from work done the same way for generations.",
      "The Munda family do not think of themselves as suppliers. They are stewards — of the herd, of the forest fringe, of a knowledge that cannot be written down. When you reserve a jar, it is their season you are protecting.",
      "We sat with them as the light came up. No one rushed. That, more than anything, is the house's philosophy made visible.",
    ],
    gallery: ["/journal/our-story.webp", "/journal/bilona.webp", "/lifestyle.webp"],
  },
  {
    slug: "forty-two-grasses-a-biodiversity-count",
    title: "Forty-Two Grasses: A Biodiversity Count",
    date: "2 April 2026",
    month: "April 2026",
    category: "Biodiversity Updates",
    readingTime: "8 min",
    excerpt:
      "This spring's survey of the north meadow recorded forty-two native grasses and herbs — and the return of two species not seen in years.",
    hero: "/journal/forest-graze.webp",
    content: [
      "Each spring we walk the meadow with the village elders and count. Not yield, not jars — species. It is the truest measure we have of whether the ecosystem is healing.",
      "This year the count reached forty-two native grasses and herbs, up from thirty-eight. More telling still: two species absent for years have returned to the eastern slope, a sign that the unsprayed, free-grazed land is recovering its old richness.",
      "A diverse pasture makes a diverse diet, and a diverse diet makes the ghee what it is. Biodiversity is not a side effect of what we do. It is the product.",
    ],
    gallery: ["/journal/forest-graze.webp", "/journal/our-story.webp", "/cows/nandini.webp"],
  },
];

export const diaryBySlug = Object.fromEntries(diary.map((d) => [d.slug, d]));
