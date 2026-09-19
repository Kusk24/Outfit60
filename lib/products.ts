import type { ColorLabel, OccasionId, Size, StyleId } from "./data";

export type Gender = "men" | "women";
export type Slot = "top" | "bottom" | "dress" | "outer" | "bag";

export interface Product {
  id: string;
  name: string;
  /** "unisex" items can be picked for either gender. */
  gender: Gender | "unisex";
  cat: string;
  slot: Slot;
  price: number;
  /** null = one size (bags). */
  sizes: readonly Size[] | null;
  styles: StyleId[];
  occs: OccasionId[];
  colors: ColorLabel[];
  image: string;
}

const W = ["XS", "S", "M", "L", "XL"] as const;
const WX = ["XS", "S", "M", "L", "XL", "XXL"] as const;
const WS = ["XS", "S", "M", "L"] as const;
const M = ["S", "M", "L", "XL", "XXL"] as const;
const MX = ["XS", "S", "M", "L", "XL", "XXL"] as const;
const ONE_SIZE = null;

const p = (
  id: string,
  name: string,
  gender: Product["gender"],
  cat: string,
  slot: Slot,
  price: number,
  sizes: Product["sizes"],
  styles: StyleId[],
  occs: OccasionId[],
  colors: ColorLabel[],
): Product => ({ id, name, gender, cat, slot, price, sizes, styles, occs, colors, image: `/products/${id}.webp` });

// Photos live in public/products (converted from the Men/ and Girl/ source folders).
// Prices are indicative THB prices for the campaign prototype.
export const PRODUCTS: Product[] = [
  p("women-2-way-one-handle-bag", "2-Way One Handle Bag", "women", "BAGS", "bag", 990, ONE_SIZE, ["trendy", "minimal"], ["weekend", "class"], ["Beige"]),
  p("women-coated-cotton-shoulder-bag", "Coated Cotton Shoulder Bag", "unisex", "BAGS", "bag", 790, ONE_SIZE, ["minimal", "trendy"], ["class", "travel", "weekend"], ["Black"]),
  p("women-drawstring-tote-bag", "Drawstring Tote Bag", "unisex", "BAGS", "bag", 990, ONE_SIZE, ["smart", "minimal"], ["interview", "class"], ["Blue"]),
  p("women-drawstring-gift-bag", "Drawstring Gift Bag", "women", "BAGS", "bag", 190, ONE_SIZE, ["minimal"], ["budget"], ["White"]),
  p("women-puffy-bag", "Puffy Bag", "women", "BAGS", "bag", 1290, ONE_SIZE, ["trendy", "relaxed"], ["weekend", "class"], ["Grey"]),
  p("women-reusable-canvas-bag", "Reusable Canvas Bag", "unisex", "BAGS", "bag", 390, ONE_SIZE, ["relaxed", "minimal"], ["class", "budget", "weekend"], ["White"]),
  p("women-round-mini-shoulder-bag", "Round Mini Shoulder Bag", "women", "BAGS", "bag", 590, ONE_SIZE, ["trendy", "minimal"], ["weekend", "class", "budget"], []),
  p("women-soft-coated-drawstring-bag", "Soft Coated Drawstring Bag", "women", "BAGS", "bag", 1290, ONE_SIZE, ["trendy", "smart"], ["weekend", "interview"], ["Black"]),
  p("women-utility-backpack", "Utility Backpack", "unisex", "BAGS", "bag", 1490, ONE_SIZE, ["sporty", "minimal"], ["travel", "class"], ["Black"]),
  p("women-utility-shoulder-bag", "Utility Shoulder Bag", "unisex", "BAGS", "bag", 990, ONE_SIZE, ["sporty", "relaxed"], ["travel", "weekend"], ["Green"]),
  p("women-wide-denim-culottes", "Wide Denim Culottes", "women", "BOTTOMS", "bottom", 990, W, ["relaxed", "trendy"], ["weekend", "travel", "class"], ["Blue"]),
  p("women-cotton-easy-shorts", "Cotton Easy Shorts", "women", "BOTTOMS", "bottom", 590, WX, ["relaxed"], ["weekend", "travel", "budget"], ["Blue"]),
  p("women-denim-culottes", "Denim Culottes", "women", "BOTTOMS", "bottom", 990, W, ["relaxed", "trendy"], ["class", "weekend", "travel"], ["Blue"]),
  p("women-nylon-culottes", "Nylon Culottes", "women", "BOTTOMS", "bottom", 990, W, ["smart", "minimal"], ["class", "interview", "weekend"], ["Grey"]),
  p("women-pleated-skort", "Pleated Skort", "women", "BOTTOMS", "bottom", 790, WS, ["trendy", "smart"], ["class", "weekend"], ["Grey"]),
  p("women-rayon-relaco-3-4-shorts", "Rayon RELACO 3/4 Shorts", "women", "BOTTOMS", "bottom", 590, WX, ["relaxed"], ["travel", "weekend", "budget"], ["Blue"]),
  p("women-sanrio-characters-relaco-3-4-shorts", "Sanrio Characters RELACO 3/4 Shorts", "women", "BOTTOMS", "bottom", 590, W, ["relaxed", "trendy"], ["weekend", "budget"], ["White"]),
  p("women-slit-skort", "Slit Skort", "women", "BOTTOMS", "bottom", 790, WS, ["trendy", "minimal"], ["class", "weekend"], ["Black"]),
  p("women-smart-wide-straight-pants", "Smart Wide Straight Pants", "women", "BOTTOMS", "bottom", 1290, WX, ["smart", "minimal"], ["interview", "class"], ["Black", "Grey"]),
  p("women-ultra-stretch-active-flare-leggings", "Ultra Stretch Active Flare Leggings", "women", "BOTTOMS", "bottom", 990, WX, ["sporty"], ["travel", "weekend"], ["Grey"]),
  p("women-combination-tiered-dress", "Combination Tiered Dress", "women", "DRESSES", "dress", 1290, W, ["trendy", "relaxed"], ["weekend", "travel"], ["Blue"]),
  p("women-cotton-blend-volume-sleeve-dress", "Cotton Blend Volume Sleeve Dress", "women", "DRESSES", "dress", 1290, W, ["trendy"], ["weekend", "class"], ["Green", "Beige"]),
  p("women-cotton-stand-collar-dress", "Cotton Stand Collar Dress", "women", "DRESSES", "dress", 1490, W, ["smart", "minimal"], ["interview", "class"], ["Blue"]),
  p("women-double-face-knit-dress", "Double Face Knit Dress", "women", "DRESSES", "dress", 1490, W, ["minimal", "smart"], ["interview", "weekend"], ["Grey"]),
  p("women-oversized-t-shirt-dress", "Oversized T-Shirt Dress", "women", "DRESSES", "dress", 790, WX, ["relaxed", "minimal"], ["weekend", "travel", "budget", "class"], ["Grey", "White"]),
  p("women-relaxed-printed-dress", "Relaxed Printed Dress", "women", "DRESSES", "dress", 990, WX, ["relaxed", "trendy"], ["weekend", "travel"], ["Blue"]),
  p("women-satin-combination-dress", "Satin Combination Dress", "women", "DRESSES", "dress", 1990, W, ["smart", "minimal"], ["interview", "weekend"], ["Green"]),
  p("women-seersucker-shirt-dress", "Seersucker Shirt Dress", "women", "DRESSES", "dress", 1490, W, ["smart", "relaxed"], ["class", "weekend", "interview"], ["Blue"]),
  p("women-ultra-stretch-airism-dress", "Ultra Stretch AIRism Dress", "women", "DRESSES", "dress", 990, W, ["minimal", "sporty"], ["travel", "weekend", "class"], []),
  p("women-washable-ribbed-knit-dress", "Washable Ribbed Knit Dress", "women", "DRESSES", "dress", 990, W, ["minimal"], ["class", "weekend", "budget"], []),
  p("women-cotton-blend-parka", "Cotton Blend Parka", "women", "OUTERWEAR", "outer", 1990, WX, ["sporty", "relaxed"], ["travel", "weekend"], []),
  p("women-double-breasted-jacket", "Double Breasted Jacket", "women", "OUTERWEAR", "outer", 2490, W, ["smart", "minimal"], ["interview", "class"], ["Beige"]),
  p("women-faux-fur-hooded-jacket", "Faux Fur Hooded Jacket", "women", "OUTERWEAR", "outer", 2490, W, ["trendy", "relaxed"], ["travel", "weekend"], ["Beige"]),
  p("women-faux-shearling-short-coat", "Faux Shearling Short Coat", "women", "OUTERWEAR", "outer", 2990, W, ["trendy"], ["travel", "weekend"], []),
  p("women-belted-long-coat", "Belted Long Coat", "women", "OUTERWEAR", "outer", 2990, WX, ["minimal", "smart"], ["interview", "travel"], ["Black"]),
  p("women-miracle-air-jacket", "Miracle Air Jacket", "women", "OUTERWEAR", "outer", 1990, WX, ["smart", "minimal"], ["interview", "class", "travel"], ["Grey"]),
  p("women-premium-linen-jacket", "Premium Linen Jacket", "women", "OUTERWEAR", "outer", 2490, W, ["smart", "relaxed"], ["interview", "travel", "weekend"], []),
  p("women-seamless-down-long-coat", "Seamless Down Long Coat", "women", "OUTERWEAR", "outer", 2990, WX, ["sporty", "minimal"], ["travel"], ["Green"]),
  p("women-tailored-jacket", "Tailored Jacket", "women", "OUTERWEAR", "outer", 2490, WX, ["smart", "minimal"], ["interview", "class"], ["Beige"]),
  p("women-zip-up-short-jacket", "Zip-Up Short Jacket", "women", "OUTERWEAR", "outer", 1990, W, ["trendy", "relaxed"], ["weekend", "class", "travel"], ["Beige"]),
  p("women-airism-cotton-bra-sleeveless-top", "AIRism Cotton Bra Sleeveless Top", "women", "TOPS", "top", 590, W, ["sporty", "minimal"], ["travel", "weekend", "budget"], ["Green"]),
  p("women-chiikawa-ut-graphic-t-shirt", "CHIIKAWA UT Graphic T-Shirt", "women", "TOPS", "top", 390, WX, ["trendy", "relaxed"], ["class", "weekend", "budget"], []),
  p("women-henley-neck-sleeveless-top", "Henley Neck Sleeveless Top", "women", "TOPS", "top", 590, W, ["minimal", "relaxed"], ["weekend", "travel", "budget"], ["Blue", "White"]),
  p("women-mini-t-shirt", "Mini T-Shirt", "women", "TOPS", "top", 390, WX, ["minimal", "trendy"], ["class", "weekend", "budget"], []),
  p("women-ribbed-cropped-bra-top", "Ribbed Cropped Bra Top", "women", "TOPS", "top", 590, WS, ["trendy", "sporty"], ["weekend", "travel"], ["Blue"]),
  p("women-ribbed-lace-v-neck-camisole", "Ribbed Lace V-Neck Camisole", "women", "TOPS", "top", 490, WS, ["trendy"], ["weekend", "budget"], ["White"]),
  p("women-supima-cotton-long-sleeve-t-shirt", "SUPIMA Cotton Long Sleeve T-Shirt", "women", "TOPS", "top", 590, WX, ["minimal", "smart"], ["class", "interview", "travel"], []),
  p("women-shirring-bra-camisole", "Shirring Bra Camisole", "women", "TOPS", "top", 790, W, ["trendy", "relaxed"], ["weekend", "travel"], ["Green"]),
  p("women-striped-t-shirt", "Striped T-Shirt", "women", "TOPS", "top", 590, WX, ["minimal", "relaxed"], ["class", "weekend", "budget"], ["White", "Black"]),
  p("women-washable-knit-bra-sleeveless-top", "Washable Knit Bra Sleeveless Top", "women", "TOPS", "top", 790, W, ["minimal", "smart"], ["interview", "class", "weekend"], ["Black"]),
  p("men-cotton-bomber-jacket", "Cotton Bomber Jacket", "men", "JACKETS", "outer", 1990, M, ["smart", "trendy"], ["class", "weekend", "travel"], ["Black"]),
  p("men-loose-fit-scuba-zip-through-hoodie", "Loose Fit Scuba Zip-Through Hoodie", "men", "HOODIES", "outer", 1490, M, ["sporty", "relaxed"], ["travel", "weekend", "class"], ["Grey"]),
  p("men-loose-fit-sweatshirt", "Loose Fit Sweatshirt", "men", "SWEATSHIRTS", "top", 990, MX, ["minimal", "relaxed"], ["class", "weekend", "travel"], ["Blue", "Black"]),
  p("men-oversized-fit-printed-zip-through-hoodie", "Oversized Fit Printed Zip-Through Hoodie", "men", "HOODIES", "outer", 1490, M, ["trendy"], ["weekend", "class"], ["Black"]),
  p("men-oversized-fit-sweatshirt", "Oversized Fit Sweatshirt", "men", "SWEATSHIRTS", "top", 990, M, ["minimal", "relaxed"], ["class", "weekend"], ["Grey"]),
  p("men-oversized-fit-zip-through-hoodie", "Oversized Fit Zip-Through Hoodie", "men", "HOODIES", "outer", 1490, M, ["trendy", "sporty"], ["weekend", "class"], ["Blue"]),
  p("men-relaxed-fit-hoodie", "Relaxed Fit Hoodie", "men", "HOODIES", "top", 1290, M, ["relaxed", "sporty"], ["weekend", "travel", "class"], ["Grey"]),
  p("men-relaxed-fit-printed-hoodie", "Relaxed Fit Printed Hoodie", "men", "HOODIES", "top", 1290, M, ["trendy", "relaxed"], ["weekend", "class"], ["White"]),
  p("men-relaxed-fit-zip-top-sweatshirt", "Relaxed Fit Zip-Top Sweatshirt", "men", "SWEATSHIRTS", "top", 1290, M, ["smart", "sporty", "minimal"], ["travel", "class", "weekend"], ["Black"]),
  p("men-sports-zip-through-hoodie-with-drymovetm", "Sports Zip-Through Hoodie with DryMove™", "men", "HOODIES", "outer", 1490, M, ["sporty"], ["travel", "weekend"], ["Black"]),
  p("men-baggy-jeans", "Baggy Jeans", "men", "JEANS", "bottom", 1490, M, ["trendy", "relaxed"], ["weekend", "class"], ["Black"]),
  p("men-loose-fit-balloon-leg-jeans", "Loose Fit Balloon-Leg Jeans", "men", "JEANS", "bottom", 1490, M, ["trendy"], ["weekend", "class"], ["Grey", "Green"]),
  p("men-loose-fit-barrel-jeans", "Loose Fit Barrel Jeans", "men", "JEANS", "bottom", 1490, M, ["trendy", "relaxed"], ["weekend", "travel"], ["Beige", "Blue"]),
  p("men-loose-straight-jeans", "Loose Straight Jeans", "men", "JEANS", "bottom", 1290, M, ["relaxed", "minimal"], ["class", "weekend", "travel"], ["Black"]),
  p("men-loose-wide-twisted-seam-jeans", "Loose Wide Twisted-Seam Jeans", "men", "JEANS", "bottom", 1490, M, ["trendy"], ["weekend"], []),
  p("men-original-straight-jeans", "Original Straight Jeans", "men", "JEANS", "bottom", 1290, MX, ["minimal", "relaxed"], ["class", "weekend", "travel"], ["Blue"]),
  p("men-regular-jeans", "Regular Jeans", "men", "JEANS", "bottom", 990, MX, ["minimal", "relaxed"], ["class", "weekend", "travel"], ["Blue"]),
  p("men-relaxed-bootcut-jeans", "Relaxed Bootcut Jeans", "men", "JEANS", "bottom", 1290, M, ["trendy", "relaxed"], ["weekend", "class"], ["Blue"]),
  p("men-relaxed-jeans", "Relaxed Jeans", "men", "JEANS", "bottom", 1290, M, ["relaxed"], ["weekend", "travel", "class"], ["Grey"]),
  p("men-straight-regular-jeans", "Straight Regular Jeans", "men", "JEANS", "bottom", 1290, MX, ["smart", "minimal"], ["class", "weekend"], ["Black", "Blue"]),
  p("men-coolmax-slim-fit-polo-shirt", "COOLMAX® Slim Fit Polo Shirt", "men", "POLO SHIRTS", "top", 790, M, ["sporty", "smart"], ["travel", "weekend", "class"], ["Black"]),
  p("men-loose-fit-fine-knit-polo-shirt", "Loose Fit Fine-Knit Polo Shirt", "men", "POLO SHIRTS", "top", 990, M, ["trendy", "relaxed"], ["weekend", "travel"], ["Green", "White"]),
  p("men-regular-fit-fine-knit-polo-neck-jumper", "Regular Fit Fine-Knit Polo-Neck Jumper", "men", "KNITWEAR", "top", 990, M, ["smart", "minimal"], ["interview", "class"], ["Black"]),
  p("men-regular-fit-polo-shirt", "Regular Fit Polo Shirt", "men", "POLO SHIRTS", "top", 590, MX, ["minimal", "smart"], ["class", "interview", "budget"], ["Black"]),
  p("men-regular-fit-textured-knit-polo-shirt", "Regular Fit Textured-Knit Polo Shirt", "men", "POLO SHIRTS", "top", 990, M, ["smart", "minimal"], ["interview", "class"], ["Grey"]),
  p("men-relaxed-fit-hole-knit-polo-shirt", "Relaxed Fit Hole-Knit Polo Shirt", "men", "POLO SHIRTS", "top", 990, M, ["trendy", "relaxed"], ["weekend", "travel"], ["Black", "White"]),
  p("men-slim-fit-jacquard-knit-polo-shirt", "Slim Fit Jacquard-Knit Polo Shirt", "men", "POLO SHIRTS", "top", 990, M, ["smart"], ["interview", "class"], ["Blue"]),
  p("men-slim-fit-polo-shirt", "Slim Fit Polo Shirt", "men", "POLO SHIRTS", "top", 390, MX, ["minimal", "smart"], ["class", "budget", "weekend"], ["Blue", "Green"]),
  p("men-slim-fit-textured-jersey-polo-shirt", "Slim Fit Textured Jersey Polo Shirt", "men", "POLO SHIRTS", "top", 790, M, ["smart", "trendy"], ["class", "weekend", "interview"], []),
  p("men-slim-fit-waffle-knit-polo-shirt", "Slim Fit Waffle-Knit Polo Shirt", "men", "POLO SHIRTS", "top", 590, MX, ["minimal", "relaxed"], ["class", "weekend", "budget"], ["Green", "Beige"]),
  p("men-loose-fit-printed-cotton-shirt", "Loose Fit Printed Cotton Shirt", "men", "SHIRTS", "top", 990, M, ["trendy", "relaxed"], ["weekend", "travel"], ["Blue"]),
  p("men-loose-fit-printed-resort-shirt", "Loose Fit Printed Resort Shirt", "men", "SHIRTS", "top", 990, M, ["trendy", "relaxed"], ["weekend", "travel"], ["White"]),
  p("men-loose-fit-short-sleeved-denim-shirt", "Loose Fit Short-Sleeved Denim Shirt", "men", "SHIRTS", "top", 990, M, ["relaxed", "trendy"], ["class", "weekend"], ["Blue"]),
  p("men-overshirt", "Overshirt", "men", "SHIRTS", "top", 1290, M, ["relaxed", "smart", "minimal"], ["class", "weekend", "travel"], []),
  p("men-regular-fit-easy-iron-shirt", "Regular Fit Easy-Iron Shirt", "men", "SHIRTS", "top", 990, MX, ["smart", "minimal"], ["interview", "class"], ["Blue", "White"]),
  p("men-relaxed-fit-linen-blend-resort-shirt", "Relaxed Fit Linen-Blend Resort Shirt", "men", "SHIRTS", "top", 990, M, ["relaxed", "trendy"], ["travel", "weekend"], []),
  p("men-relaxed-fit-modal-blend-resort-shirt", "Relaxed Fit Modal-Blend Resort Shirt", "men", "SHIRTS", "top", 990, M, ["relaxed", "minimal"], ["travel", "weekend"], ["Green"]),
  p("men-relaxed-fit-oxford-shirt", "Relaxed Fit Oxford Shirt", "men", "SHIRTS", "top", 990, MX, ["smart", "minimal"], ["interview", "class"], ["White"]),
  p("men-relaxed-fit-resort-shirt", "Relaxed Fit Resort Shirt", "men", "SHIRTS", "top", 790, MX, ["trendy"], ["weekend", "travel"], ["Black", "White"]),
  p("men-relaxed-fit-washed-denim-shirt", "Relaxed Fit Washed Denim Shirt", "men", "SHIRTS", "top", 1290, M, ["trendy", "relaxed"], ["weekend", "class"], ["Blue"]),
  p("men-four-way-stretch-wide-pull-on-trousers", "Four-Way Stretch Wide Pull-On Trousers", "men", "TROUSERS", "bottom", 990, M, ["relaxed", "minimal", "smart"], ["travel", "class", "weekend"], ["Beige"]),
  p("men-loose-fit-appliqued-jersey-trousers", "Loose Fit Appliquéd Jersey Trousers", "men", "TROUSERS", "bottom", 790, M, ["sporty", "trendy"], ["weekend"], ["Grey"]),
  p("men-relaxed-fit-cargo-trousers", "Relaxed Fit Cargo Trousers", "men", "TROUSERS", "bottom", 1290, M, ["trendy", "relaxed"], ["travel", "weekend"], ["Green"]),
  p("men-relaxed-fit-cotton-chinos", "Relaxed Fit Cotton Chinos", "men", "TROUSERS", "bottom", 990, MX, ["smart", "relaxed", "minimal"], ["class", "weekend", "interview"], ["Beige"]),
  p("men-relaxed-fit-interlock-sweatpants", "Relaxed Fit Interlock Sweatpants", "men", "TROUSERS", "bottom", 590, MX, ["sporty", "relaxed"], ["travel", "weekend", "budget"], ["Grey"]),
  p("men-relaxed-fit-printed-sweatpants", "Relaxed Fit Printed Sweatpants", "men", "TROUSERS", "bottom", 590, M, ["sporty", "trendy"], ["weekend", "budget"], ["Beige"]),
  p("men-relaxed-fit-scuba-barrel-joggers", "Relaxed Fit Scuba Barrel Joggers", "men", "TROUSERS", "bottom", 990, M, ["sporty", "trendy"], ["travel", "weekend", "class"], ["Black"]),
  p("men-relaxed-fit-trousers", "Relaxed Fit Trousers", "men", "TROUSERS", "bottom", 1290, M, ["smart", "minimal"], ["interview", "class"], ["Grey"]),
  p("men-slim-fit-cotton-chinos", "Slim Fit Cotton Chinos", "men", "TROUSERS", "bottom", 990, MX, ["smart", "minimal"], ["interview", "class"], ["Blue", "Black"]),
  p("men-slim-fit-tailored-trousers", "Slim Fit Tailored Trousers", "men", "TROUSERS", "bottom", 1490, MX, ["smart"], ["interview"], ["Beige", "Grey"]),
];

const BY_ID = new Map(PRODUCTS.map((item) => [item.id, item]));

export const getProduct = (id: string) => BY_ID.get(id);

export const getProducts = (ids: readonly string[]) =>
  ids.map(getProduct).filter((item): item is Product => Boolean(item));
