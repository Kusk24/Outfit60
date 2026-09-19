export type OccasionId = "interview" | "class" | "travel" | "weekend" | "budget" | "other";
export type StyleId = "minimal" | "smart" | "relaxed" | "trendy" | "sporty";
export type ColorLabel = "Black" | "White" | "Beige" | "Blue" | "Grey" | "Green";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export const OCCASIONS: { id: OccasionId; title: string; sub: string; short: string }[] = [
  { id: "interview", title: "💼 Job Interview", sub: "Professional + comfortable", short: "Job Interview" },
  { id: "class", title: "🎓 First Day of Class", sub: "Simple + confident", short: "First Day of Class" },
  { id: "travel", title: "✈️ Chiang Mai Trip", sub: "Comfortable + travel-ready", short: "Chiang Mai Trip" },
  { id: "weekend", title: "☕ Casual Weekend", sub: "Relaxed + stylish", short: "Casual Weekend" },
  { id: "budget", title: "💰 Outfit Under ฿1,000", sub: "Maximum style, minimum budget", short: "Under ฿1,000" },
  { id: "other", title: "➕ Other", sub: "Tell us what you need", short: "My Occasion" },
];

export const STYLES: { id: StyleId; title: string; sub: string }[] = [
  { id: "minimal", title: "Minimal", sub: "Clean and simple" },
  { id: "smart", title: "Smart Casual", sub: "Polished but comfortable" },
  { id: "relaxed", title: "Relaxed", sub: "Easy everyday style" },
  { id: "trendy", title: "Trendy", sub: "Modern and fashionable" },
  { id: "sporty", title: "Sporty", sub: "Active and functional" },
];

export const COLORS: { label: ColorLabel; hex: string }[] = [
  { label: "Black", hex: "#111111" },
  { label: "White", hex: "#ffffff" },
  { label: "Beige", hex: "#d9c7a7" },
  { label: "Blue", hex: "#3b5e8c" },
  { label: "Grey", hex: "#9a9a9a" },
  { label: "Green", hex: "#5a7a5e" },
];

export const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const GENDERS = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
] as const;

export const BUDGETS = [
  { label: "Under ฿1,000", value: 1000 },
  { label: "฿1,000 – ฿2,000", value: 2000 },
  { label: "฿2,000 – ฿3,000", value: 3000 },
  { label: "฿3,000+", value: 4500 },
];

/** The "Under ฿1,000" challenge caps whatever budget is set. */
export const BUDGET_CHALLENGE_CAP = 1000;

export const STEP_LABELS = [
  "Checking your occasion",
  "Matching your style",
  "Checking your size",
  "Staying within your budget",
  "Checking available stock",
  "Building your complete outfit",
];

export const HOW_STEPS = [
  { n: "1", t: "Occasion", s: "Where are you going?" },
  { n: "2", t: "Budget", s: "Set your limit in baht" },
  { n: "3", t: "Size", s: "XS to XXL" },
  { n: "4", t: "Style", s: "We build the full look" },
];

export const EXAMPLES: { title: string; quote: string; occ: OccasionId }[] = [
  { title: "Job Interview", quote: "Professional but comfortable", occ: "interview" },
  { title: "First Day of Class", quote: "Simple, confident and affordable", occ: "class" },
  { title: "Chiang Mai Trip", quote: "Comfortable for travel", occ: "travel" },
  { title: "Under ฿1,000", quote: "Build the best look within my budget", occ: "budget" },
];

export const COMMUNITY: { user: string; challenge: string; time: number; occ: OccasionId; items: string[] }[] = [
  {
    user: "@maystyle",
    challenge: "First Day of Class",
    time: 48,
    occ: "class",
    items: ["women-striped-t-shirt", "women-denim-culottes", "women-round-mini-shoulder-bag"],
  },
  {
    user: "@bankkk",
    challenge: "Chiang Mai Trip",
    time: 39,
    occ: "travel",
    items: ["men-relaxed-fit-linen-blend-resort-shirt", "men-relaxed-fit-cargo-trousers", "women-utility-shoulder-bag"],
  },
  {
    user: "@ployfashion",
    challenge: "Under ฿1,000 Challenge",
    time: 54,
    occ: "budget",
    items: ["women-chiikawa-ut-graphic-t-shirt", "women-cotton-easy-shorts"],
  },
];
