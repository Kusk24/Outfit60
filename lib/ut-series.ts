import type { Size } from "./data";

/**
 * Real UNIQLO UT collaboration tees, grouped by series, fetched once from the
 * UNIQLO Thailand store and checked in. Product codes, names, prices, size runs
 * and photographs are UNIQLO's. The artwork belongs to each series' rights
 * holder and appears only inside UNIQLO's own product photography, the way any
 * shop listing shows it. This is a student campaign concept, not a shop.
 */
export interface UtDesignItem {
  id: string;
  /** Position within the series; the artwork is what tells them apart. */
  label: string;
  productId: string;
  name: string;
  nameTh: string;
  price: number;
  sizes: readonly Size[];
  /** The garment photo's aspect ratio. */
  ratio: number;
  image: string;
  /** Close-up of the print: UNIQLO shoots the plain front, so the art lives here. */
  art: string;
}

export interface UtSeries {
  slug: string;
  name: string;
  nameTh: string;
  designs: UtDesignItem[];
}

const d = (
  id: string,
  label: string,
  productId: string,
  name: string,
  nameTh: string,
  price: number,
  sizes: readonly Size[],
  ratio: number,
): UtDesignItem => ({
  id, label, productId, name, nameTh, price, sizes, ratio,
  image: `/ut/series/${id}.webp`,
  art: `/ut/series/${id}-art.webp`,
});

export const UT_SERIES: UtSeries[] = [
  {
    slug: "naruto",
    name: "Naruto",
    nameTh: "นารูโตะ",
    designs: [
      d("naruto-488254", "1", "E488254-000", "MANGA UT SHUEISHA 100th (Short Sleeve Graphic T-Shirt) | Naruto", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | นารูโตะ", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1621),
      d("naruto-488253", "2", "E488253-000", "MANGA UT SHUEISHA 100th (Short Sleeve Graphic T-Shirt) | Naruto", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | นารูโตะ", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1621),
      d("naruto-488252", "3", "E488252-000", "MANGA UT SHUEISHA 100th (Short Sleeve Graphic T-Shirt) | Naruto", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | นารูโตะ", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1049),
    ],
  },
  {
    slug: "one-piece",
    name: "One Piece",
    nameTh: "วันพีซ",
    designs: [
      d("one-piece-488250", "1", "E488250-000", "MANGA UT SHUEISHA 100th (Short Sleeve Graphic T-Shirt) | One Piece", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | วันพีช", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1765),
      d("one-piece-487575", "2", "E487575-000", "MANGA UT SHUEISHA 100th (Short Sleeve Graphic T-Shirt) | One Piece", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | วันพีช", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1656),
      d("one-piece-488248", "3", "E488248-000", "ONE PIECE UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น ONE PIECE UT", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.171),
    ],
  },
  {
    slug: "jujutsu-kaisen",
    name: "Jujutsu Kaisen",
    nameTh: "มหาเวทย์ผนึกมาร",
    designs: [
      d("jujutsu-kaisen-487562", "1", "E487562-000", "MANGA UT SHUEISHA 100th | Jujutsu Kaisen (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | มหาเวทย์ผนึกมาร (Jujutsu Kaisen)", 490, ["S", "M", "L", "XL", "XXL"] as const, 1.1326),
      d("jujutsu-kaisen-487561", "2", "E487561-000", "MANGA UT SHUEISHA 100th | Jujutsu Kaisen (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | มหาเวทย์ผนึกมาร (Jujutsu Kaisen)", 490, ["S", "M", "L", "XL", "XXL"] as const, 1.1429),
      d("jujutsu-kaisen-487560", "3", "E487560-000", "MANGA UT SHUEISHA 100th | Jujutsu Kaisen (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | มหาเวทย์ผนึกมาร (Jujutsu Kaisen)", 490, ["S", "M", "L", "XL", "XXL"] as const, 1.1801),
    ],
  },
  {
    slug: "bleach",
    name: "BLEACH",
    nameTh: "บลีช",
    designs: [
      d("bleach-489663", "1", "E489663-000", "MANGA UT SHUEISHA 100th | BLEACH (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | บลีช เทพมรณะ (BLEACH)", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1674),
      d("bleach-489662", "2", "E489662-000", "MANGA UT SHUEISHA 100th | BLEACH (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | บลีช เทพมรณะ (BLEACH)", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1621),
    ],
  },
  {
    slug: "spy-x-family",
    name: "SPY x FAMILY",
    nameTh: "SPY x FAMILY",
    designs: [
      d("spy-x-family-489653", "1", "E489653-000", "MANGA UT SHUEISHA 100th | SPY x FAMILY (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | SPY x FAMILY", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.171),
      d("spy-x-family-489652", "2", "E489652-000", "MANGA UT SHUEISHA 100th | SPY x FAMILY (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | SPY x FAMILY", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1585),
      d("spy-x-family-489651", "3", "E489651-000", "MANGA UT SHUEISHA 100th | SPY x FAMILY (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | SPY x FAMILY", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1463),
    ],
  },
  {
    slug: "pokemon",
    name: "Pokémon",
    nameTh: "โปเกมอน",
    designs: [
      d("pokemon-487966", "1", "E487966-000", "Pokémon UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น Pokémon UT", 490, ["XS", "S", "M", "L", "XL"] as const, 1.1856),
      d("pokemon-486159", "2", "E486159-000", "Pokémon UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น Pokémon UT", 490, ["S", "M", "L", "XL"] as const, 1.1377),
      d("pokemon-486158", "3", "E486158-000", "Pokémon UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น Pokémon UT", 490, ["XS", "S", "M", "L", "XL"] as const, 1.1728),
    ],
  },
];
