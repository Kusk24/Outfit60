// The UT Creator Studio's design engine.
//
// Designs are generated from a seed, not drawn by an image model: the same seed
// always produces the same graphic, which is what makes a design link shareable.

import { getProduct, type Product } from "./products";

/** A tee we can print on: plain, photographed front-on, whole garment in frame. */
interface BlankSpec {
  id: string;
  /** The photo's own aspect ratio, so the print area lines up with the garment. */
  ratio: number;
  /** Chest print area as a percentage of the photo: centre point and width. */
  print: { x: number; y: number; w: number };
}

const BLANKS: BlankSpec[] = [
  { id: "u-u-crew-neck-t-shirt", ratio: 432 / 471, print: { x: 50, y: 46, w: 34 } },
  { id: "u-dry-color-crew-neck-t-shirt", ratio: 455 / 442, print: { x: 50, y: 47, w: 33 } },
  { id: "m-airism-cotton-crew-neck-t-shirt", ratio: 432 / 442, print: { x: 50, y: 47, w: 33 } },
];

export interface UtBlank extends BlankSpec {
  product: Product;
}

export const UT_BLANKS: UtBlank[] = BLANKS.flatMap((blank) => {
  const product = getProduct(blank.id);
  return product ? [{ ...blank, product }] : [];
});

export const FAMILIES = ["shapes", "wordmark", "field"] as const;
export type Family = (typeof FAMILIES)[number];

export const PALETTES = [
  { id: "brand", colors: ["#e60012", "#111111", "#ffffff"] },
  { id: "ink", colors: ["#111111", "#6b6b6b", "#ffffff"] },
  { id: "indigo", colors: ["#1f3a6e", "#5b8ac4", "#f2efe9"] },
  { id: "sand", colors: ["#6b4a2f", "#caa070", "#fdf8f1"] },
  { id: "olive", colors: ["#3f5136", "#8aa06f", "#f5f3e8"] },
] as const;

export type PaletteId = (typeof PALETTES)[number]["id"];

export interface UtDesign {
  family: Family;
  seed: number;
  /** Index into PALETTES. */
  palette: number;
  /** Print width as a percentage of the chest area, 55–115. */
  scale: number;
  /** Only used by the wordmark family. */
  word: string;
}

/** Marks are drawn in a 100 x 100 box, whatever the print ends up being sized at. */
export type Mark =
  | { kind: "rect"; x: number; y: number; w: number; h: number; rot: number; fill: string }
  | { kind: "circle"; cx: number; cy: number; r: number; fill: string }
  | { kind: "ring"; cx: number; cy: number; r: number; stroke: string; sw: number }
  | { kind: "text"; y: number; size: number; fill: string; value: string };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** mulberry32 — small, fast, and identical across machines, which the seeded link depends on. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const randomSeed = () => Math.floor(Math.random() * 0xffffff);

/** Geometric marks on a loose grid: one anchor shape, then smaller ones around it. */
function shapes(random: () => number, colors: readonly string[]): Mark[] {
  const marks: Mark[] = [];
  const pick = () => colors[Math.floor(random() * colors.length)];
  const anchorR = 24 + random() * 9;

  if (random() < 0.5) {
    marks.push({ kind: "circle", cx: 50, cy: 46, r: anchorR, fill: colors[0] });
  } else {
    const size = anchorR * 1.75;
    marks.push({ kind: "rect", x: 50 - size / 2, y: 46 - size / 2, w: size, h: size, rot: 0, fill: colors[0] });
  }

  const count = 2 + Math.floor(random() * 3);
  for (let i = 0; i < count; i++) {
    // Spread the smaller marks around the anchor rather than letting them clump,
    // and keep them inside the box so the composition stays centred on the chest.
    const angle = (i / count) * Math.PI * 2 + random() * 0.8;
    const distance = anchorR * (0.7 + random() * 0.45);
    const r = 6 + random() * 9;
    const cx = clamp(50 + Math.cos(angle) * distance, r + 2, 98 - r);
    const cy = clamp(46 + Math.sin(angle) * distance, r + 2, 98 - r);
    const roll = random();
    if (roll < 0.4) {
      marks.push({ kind: "circle", cx, cy, r, fill: pick() });
    } else if (roll < 0.75) {
      marks.push({ kind: "rect", x: cx - r, y: cy - r, w: r * 2, h: r * 2, rot: random() * 90, fill: pick() });
    } else {
      marks.push({ kind: "ring", cx, cy, r, stroke: pick(), sw: 2 + random() * 3 });
    }
  }
  return marks;
}

/** Display type, stacked and tight, with a rule under it. */
function wordmark(random: () => number, colors: readonly string[], word: string): Mark[] {
  const clean = word.trim() || "OUTFIT IN 60";
  const parts = clean.split(/\s+/);

  // Two or three lines read as a graphic; one long line reads as a slogan.
  const lines: string[] = [];
  const perLine = parts.length >= 4 ? 2 : 1;
  for (let i = 0; i < parts.length; i += perLine) lines.push(parts.slice(i, i + perLine).join(" "));

  const longest = lines.reduce((max, line) => Math.max(max, line.length), 1);
  // 0.62 approximates the average glyph advance of Anuphan at this weight.
  const size = Math.max(9, Math.min(30, 96 / (longest * 0.62)));
  const leading = size * 1.02;
  const blockTop = 46 - ((lines.length - 1) * leading) / 2;

  const marks: Mark[] = lines.map((value, i) => ({
    kind: "text" as const,
    y: blockTop + i * leading,
    size,
    fill: i === 0 ? colors[0] : colors[1],
    value,
  }));

  const ruleY = blockTop + (lines.length - 1) * leading + size * 0.62;
  const ruleW = 30 + random() * 45;
  marks.push({ kind: "rect", x: 50 - ruleW / 2, y: ruleY, w: ruleW, h: 2 + random() * 3, rot: 0, fill: colors[0] });
  return marks;
}

/** A repeating field of dots, sized by a seeded wave, like a textile print. */
function field(random: () => number, colors: readonly string[]): Mark[] {
  const cols = 5 + Math.floor(random() * 4);
  const gap = 100 / cols;
  const phase = random() * Math.PI * 2;
  const stretch = 0.6 + random() * 1.4;
  const marks: Mark[] = [];

  for (let row = 0; row < cols; row++) {
    for (let col = 0; col < cols; col++) {
      const wave = Math.sin(col * stretch + phase) + Math.cos(row * stretch - phase);
      const r = (gap / 2) * (0.25 + ((wave + 2) / 4) * 0.72);
      if (r < gap * 0.12) continue;
      marks.push({
        kind: "circle",
        cx: gap / 2 + col * gap,
        cy: gap / 2 + row * gap,
        r,
        fill: colors[(row + col) % 2 === 0 ? 0 : 1],
      });
    }
  }
  return marks;
}

export function generate(design: UtDesign): Mark[] {
  const random = rng(design.seed);
  const { colors } = PALETTES[design.palette] ?? PALETTES[0];
  if (design.family === "wordmark") return wordmark(random, colors, design.word);
  if (design.family === "field") return field(random, colors);
  return shapes(random, colors);
}

export const DEFAULT_DESIGN: UtDesign = {
  family: "shapes",
  seed: 0x5eed60,
  palette: 0,
  scale: 85,
  word: "",
};

const isFamily = (value: string | null): value is Family => FAMILIES.includes(value as Family);

/**
 * Reads a design out of the URL. Every field falls back to the default, so a
 * hand-edited or truncated link still renders something.
 */
export function readDesign(params: URLSearchParams): { design: UtDesign; blank: number } {
  const family = params.get("f");
  const seed = Number.parseInt(params.get("s") ?? "", 36);
  const palette = Number.parseInt(params.get("p") ?? "", 10);
  const scale = Number.parseInt(params.get("z") ?? "", 10);
  const blank = Number.parseInt(params.get("b") ?? "", 10);

  return {
    design: {
      family: isFamily(family) ? family : DEFAULT_DESIGN.family,
      seed: Number.isFinite(seed) ? seed : DEFAULT_DESIGN.seed,
      palette: Number.isFinite(palette) ? clamp(palette, 0, PALETTES.length - 1) : DEFAULT_DESIGN.palette,
      scale: Number.isFinite(scale) ? clamp(scale, 55, 115) : DEFAULT_DESIGN.scale,
      word: params.get("w") ?? DEFAULT_DESIGN.word,
    },
    blank: Number.isFinite(blank) ? clamp(blank, 0, UT_BLANKS.length - 1) : 0,
  };
}

/** The query string that reproduces this design exactly. */
export function designQuery(design: UtDesign, blank: number): string {
  const params = new URLSearchParams({
    b: String(blank),
    f: design.family,
    s: design.seed.toString(36),
    p: String(design.palette),
    z: String(design.scale),
  });
  if (design.family === "wordmark" && design.word.trim()) params.set("w", design.word.trim());
  return params.toString();
}
