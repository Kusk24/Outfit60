import type { Size } from "./data";

export interface BlankColor {
  /** UNIQLO colour code. */
  code: string;
  name: string;
  /** Swatch colour for the picker. */
  hex: string;
  image: string;
}

/**
 * The tee the studio prints on: a real UNIQLO product, with its real code,
 * price and size run. UNIQLO publishes a flat product shot for one colourway
 * only, so the other colours are rendered from that photo - see tools notes.
 */
export const UT_BLANK = {
  productId: "E422992-000",
  name: "U Crew Neck T-Shirt",
  nameTh: "เสื้อยืด U คอกลม",
  price: 390,
  sizes: ["XS", "S", "M", "L", "XL", "XXL"] as readonly Size[],
  /** The photo's aspect ratio, so the tee is never letterboxed. */
  ratio: 0.924,
  /** Printable areas: squares, centred on these percentages of the photo. */
  print: {
    front: { x: 50, y: 46, w: 44 },
    /** Back prints run larger and sit higher, as UNIQLO's own graphic tees do. */
    back: { x: 50, y: 44, w: 54 },
  },
  colors: [
    { code: "00", name: "White", hex: "#f3f2ee", image: "/ut/tee-00.webp" },
    { code: "09", name: "Black", hex: "#242426", image: "/ut/tee-09.webp" },
    { code: "03", name: "Gray", hex: "#969698", image: "/ut/tee-03.webp" },
    { code: "69", name: "Navy", hex: "#273354", image: "/ut/tee-69.webp" },
    { code: "66", name: "Blue", hex: "#5682b6", image: "/ut/tee-66.webp" },
    { code: "32", name: "Beige", hex: "#ceb089", image: "/ut/tee-32.webp" },
    { code: "58", name: "Dark Green", hex: "#3c4f3c", image: "/ut/tee-58.webp" },
    { code: "16", name: "Red", hex: "#b02a2a", image: "/ut/tee-16.webp" },
  ],
};
