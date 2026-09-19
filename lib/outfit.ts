import { BUDGET_CHALLENGE_CAP, type ColorLabel, type OccasionId, type Size, type StyleId } from "./data";
import { PRODUCTS, type Gender, type Product, type Slot } from "./products";

export interface Prefs {
  occasion: OccasionId | null;
  budget: number;
  gender: Gender | null;
  size: Size | null;
  styles: StyleId[];
  colors: ColorLabel[];
}

export const DEFAULT_PREFS: Prefs = {
  occasion: null,
  budget: 2000,
  gender: null,
  size: null,
  styles: [],
  colors: [],
};

export const effectiveBudget = (prefs: Prefs) =>
  prefs.occasion === "budget" ? Math.min(prefs.budget, BUDGET_CHALLENGE_CAP) : prefs.budget;

/**
 * Picks a complete look (top + bottom, or a dress) plus an optional outer layer and bag,
 * scored by occasion, style and colour match and kept within budget. Items from the
 * previous look are penalised so "Try another look" gives something new.
 */
export function buildOutfit(prefs: Prefs, lastIds: readonly string[], random = Math.random): Product[] {
  const size = prefs.size ?? "M";
  const gender = prefs.gender ?? "women";
  const budget = effectiveBudget(prefs);
  const occ = prefs.occasion ?? "weekend";

  const pool = PRODUCTS.filter(
    (p) => (p.gender === gender || p.gender === "unisex") && (!p.sizes || p.sizes.includes(size)),
  );
  const scores = new Map(
    pool.map((p) => [
      p.id,
      (p.occs.includes(occ) ? 3 : 0) +
        p.styles.filter((s) => prefs.styles.includes(s)).length * 2 +
        (p.colors.some((c) => prefs.colors.includes(c)) ? 1.5 : 0) +
        random() * 2 -
        (lastIds.includes(p.id) ? 2.5 : 0),
    ]),
  );
  const by = (slot: Slot) =>
    pool.filter((p) => p.slot === slot).sort((a, b) => scores.get(b.id)! - scores.get(a.id)!);

  const pick: Product[] = [];
  let total = 0;
  const fits = (p: Product) => total + p.price <= budget;
  const add = (p: Product | undefined) => {
    if (!p || !fits(p)) return false;
    pick.push(p);
    total += p.price;
    return true;
  };
  const cheapest = (list: Product[]) => Math.min(...list.map((p) => p.price));

  const tops = by("top");
  const bottoms = by("bottom");
  const dresses = by("dress");
  const outers = by("outer");
  const bags = by("bag");

  const useDress = dresses.length > 0 && dresses[0].occs.includes(occ) && random() < 0.3 && fits(dresses[0]);
  if (useDress) {
    add(dresses[0]);
  } else {
    // Best-scoring top that still leaves room for a bottom, then the best bottom that fits.
    const cheapestBottom = cheapest(bottoms);
    const top = tops.find((p) => p.price + cheapestBottom <= budget) ?? tops.find(fits);
    add(top);
    add(bottoms.find(fits));
  }
  // Interview and travel looks always try for a layer; other occasions sometimes get one.
  if (occ === "interview" || occ === "travel" || random() < 0.4) {
    add(outers.find((p) => p.occs.includes(occ) && fits(p)));
  }
  add(bags.find((p) => fits(p) && (p.occs.includes(occ) || p.styles.some((s) => prefs.styles.includes(s)))));

  return pick;
}
