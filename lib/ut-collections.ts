import type { Size } from "./data";

/**
 * Real UNIQLO UT collaboration tees, fetched once from the UNIQLO Thailand store
 * and checked in. Names, product codes, prices, size runs and photos are UNIQLO's
 * own; the artwork belongs to each collaboration's rights holder. Used here for a
 * student campaign concept, not a commercial product.
 */
export interface UtCollection {
  id: string;
  /** Short name for the picker, e.g. "Naruto". */
  label: string;
  /** UNIQLO product code. */
  productId: string;
  name: string;
  nameTh: string;
  price: number;
  sizes: readonly Size[];
  /** The photo's aspect ratio, so the tee is never letterboxed. */
  ratio: number;
  image: string;
  /** Close-up of the print. UNIQLO shoots the plain front, so the art lives here. */
  art: string | null;
  artRatio: number;
}

const c = (
  id: string,
  label: string,
  productId: string,
  name: string,
  nameTh: string,
  price: number,
  sizes: readonly Size[],
  ratio: number,
  artRatio: number,
): UtCollection => ({
  id, label, productId, name, nameTh, price, sizes, ratio,
  image: `/ut/${id}.webp`,
  art: artRatio ? `/ut/${id}-art.webp` : null,
  artRatio: artRatio || 1,
});

export const UT_COLLECTIONS: UtCollection[] = [
  c("ut-naruto", "Naruto", "E488253-000", "MANGA UT SHUEISHA 100th (Short Sleeve Graphic T-Shirt) | Naruto", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | นารูโตะ", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1649, 0.75),
  c("ut-one-piece", "One Piece", "E487575-000", "MANGA UT SHUEISHA 100th (Short Sleeve Graphic T-Shirt) | One Piece", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | วันพีช", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1667, 0.75),
  c("ut-jujutsu-kaisen", "Jujutsu Kaisen", "E487560-000", "MANGA UT SHUEISHA 100th | Jujutsu Kaisen (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | มหาเวทย์ผนึกมาร (Jujutsu Kaisen)", 490, ["S", "M", "L", "XL", "XXL"] as const, 1.1769, 0.75),
  c("ut-bleach", "BLEACH", "E489662-000", "MANGA UT SHUEISHA 100th | BLEACH (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | บลีช เทพมรณะ (BLEACH)", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1609, 0.75),
  c("ut-spy-x-family", "SPY x FAMILY", "E488263-000", "MANGA UT SHUEISHA 100th | SPY x FAMILY (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น MANGA UT SHUEISHA 100th | SPY x FAMILY", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1414, 0.75),
  c("ut-pokemon", "Pokémon", "E484776-000", "Pokémon UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น Pokémon UT", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1777, 0.75),
  c("ut-mario-kart", "Mario Kart", "E489913-000", "MARIO KART WORLD UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น MARIO KART WORLD UT", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1355, 0.75),
  c("ut-mofusand", "mofusand", "E485164-000", "mofusand UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น mofusand UT", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1395, 0.75),
  c("ut-chiikawa", "CHIIKAWA", "E483261-000", "CHIIKAWA UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น CHIIKAWA UT", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.2401, 0.75),
  c("ut-monchhichi", "Monchhichi", "E488572-000", "Monchhichi UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น Monchhichi UT", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.295, 0.75),
  c("ut-peanuts", "PEANUTS", "E484478-000", "PEANUTS UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น PEANUTS UT", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.2188, 0.75),
  c("ut-kaws", "KAWS", "E493510-000", "KAWS UNIVERSE UT (Short Sleeve Graphic T-Shirt) | Relaxed", "เสื้อยืดแขนสั้น KAWS UNIVERSE UT | ทรงหลวม", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.2333, 0.75),
  c("ut-yoasobi", "YOASOBI", "E489914-000", "YOASOBI UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น YOASOBI UT", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.2388, 0.75),
  c("ut-ukiyo-e", "Ukiyo-e", "E485073-000", "Ukiyo-e Blue UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น Ukiyo-e Blue UT", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1623, 0.75),
  c("ut-mickey-friends", "Mickey & Friends", "E489393-000", "Mickey&Friends mini UT (Long Sleeve Mini Graphic T-Shirt)", "เสื้อยืดแขนยาว Mickey&Friends mini UT ทรงมินิ", 590, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.0279, 0.75),
  c("ut-stitch", "Stitch", "E489521-000", "Stitch in Thailand UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น Stitch in Thailand UT", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1473, 0.75),
  c("ut-moma-poster-art", "MoMA Poster Art", "E485489-000", "MoMA Poster Art Collection UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น MoMA Poster Art Collection UT", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1698, 0.75),
  c("ut-andy-warhol", "Andy Warhol", "E489160-000", "Andy Warhol Transformation UT (Short Sleeve Graphic T-Shirt)", "เสื้อยืดแขนสั้น Andy Warhol Transformation UT", 490, ["XS", "S", "M", "L", "XL", "XXL"] as const, 1.1929, 0.75),
];
