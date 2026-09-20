// Language-neutral data. Every label lives in lib/i18n/{en,th}.ts, keyed by these ids.

export type OccasionId = "interview" | "class" | "travel" | "weekend" | "budget" | "other";
export type StyleId = "minimal" | "smart" | "relaxed" | "trendy" | "sporty";
export type ColorLabel = "Black" | "White" | "Beige" | "Blue" | "Grey" | "Green";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export const OCCASIONS: OccasionId[] = ["interview", "class", "travel", "weekend", "budget", "other"];

export const STYLES: StyleId[] = ["minimal", "smart", "relaxed", "trendy", "sporty"];

export const COLORS: { label: ColorLabel; hex: string }[] = [
  { label: "Black", hex: "#111111" },
  { label: "White", hex: "#ffffff" },
  { label: "Beige", hex: "#d9c7a7" },
  { label: "Blue", hex: "#3b5e8c" },
  { label: "Grey", hex: "#9a9a9a" },
  { label: "Green", hex: "#5a7a5e" },
];

export const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const GENDERS = ["men", "women"] as const;

/** Budget tiles; labels are dict.budgetStep.options[value]. */
export const BUDGETS = [1000, 2000, 3000, 4500] as const;

/** The "Under ฿1,000" challenge caps whatever budget is set. */
export const BUDGET_CHALLENGE_CAP = 1000;

/** "Try a challenge" cards on the landing page. */
export const EXAMPLES = ["interview", "class", "travel", "budget"] as const;

export const COMMUNITY: { user: string; time: number; occ: "class" | "travel" | "budget"; items: string[] }[] = [
  {
    user: "@maystyle",
    time: 48,
    occ: "class",
    items: ["w-mini-t-shirt", "w-pleated-skort", "u-round-mini-shoulder-bag-2026-model"],
  },
  {
    user: "@bankkk",
    time: 39,
    occ: "travel",
    items: ["m-open-collar-shirt-short-sleeve", "m-linen-blend-easy-ankle-pants", "u-utility-shoulder-bag"],
  },
  {
    user: "@ployfashion",
    time: 54,
    occ: "budget",
    items: ["w-airism-cotton-t-shirt", "w-cotton-easy-shorts"],
  },
];
