// State for the UT Creator Studio: a blank tee, a colourway, and the stickers
// placed on it. Everything lives in the query string so a design can be shared,
// bookmarked or screenshotted and still come back identical.

import { INKS, STICKER_IDS } from "./stickers";
import { UT_BLANK, type BlankColor } from "./ut-blank";

/** One sticker on the tee. x/y are percentages of the print area. */
export interface Placed {
  sticker: string;
  x: number;
  y: number;
  /** Width as a percentage of the print area. */
  size: number;
  rotation: number;
  /** Index into INKS. */
  ink: number;
}

export type Side = "front" | "back";

export interface UtDesign {
  /** Index into UT_BLANK.colors. */
  color: number;
  /** Stickers are kept per side, so the two prints are independent. */
  front: Placed[];
  back: Placed[];
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const MAX_STICKERS = 6;
export const MIN_SIZE = 10;
export const MAX_SIZE = 80;

export const DEFAULT_DESIGN: UtDesign = {
  color: 0,
  front: [{ sticker: "flame", x: 50, y: 46, size: 48, rotation: 0, ink: 0 }],
  back: [],
};

export const colorOf = (design: UtDesign): BlankColor => UT_BLANK.colors[design.color] ?? UT_BLANK.colors[0];

const round = (value: number) => Math.round(value * 10) / 10;

/**
 * Stickers pack as `id,x,y,size,rotation,ink` joined by semicolons. Readable
 * enough to hand-edit, short enough to paste into a slide.
 */
function encodePlaced(placed: Placed[]): string {
  return placed
    .map((p) => [p.sticker, round(p.x), round(p.y), round(p.size), Math.round(p.rotation), p.ink].join(","))
    .join(";");
}

function decodePlaced(raw: string | null): Placed[] | null {
  if (raw === null) return null;
  if (raw === "") return [];
  return raw
    .split(";")
    .slice(0, MAX_STICKERS)
    .flatMap((chunk) => {
      const [sticker, ...rest] = chunk.split(",");
      if (!STICKER_IDS.includes(sticker)) return [];
      const [x, y, size, rotation, ink] = rest.map(Number);
      if ([x, y, size, rotation, ink].some((n) => !Number.isFinite(n))) return [];
      return [
        {
          sticker,
          x: clamp(x, 0, 100),
          y: clamp(y, 0, 100),
          size: clamp(size, MIN_SIZE, MAX_SIZE),
          rotation: clamp(rotation, -180, 180),
          ink: clamp(Math.round(ink), 0, INKS.length - 1),
        },
      ];
    });
}

/** Reads a design from the URL, falling back to the default on anything missing. */
export function readDesign(params: URLSearchParams): UtDesign {
  const color = Number.parseInt(params.get("c") ?? "", 10);
  const front = decodePlaced(params.get("s"));
  const back = decodePlaced(params.get("b"));
  return {
    color: Number.isFinite(color) ? clamp(color, 0, UT_BLANK.colors.length - 1) : DEFAULT_DESIGN.color,
    front: front ?? DEFAULT_DESIGN.front,
    back: back ?? DEFAULT_DESIGN.back,
  };
}

/** The query string that reproduces this design exactly. */
export function designQuery(design: UtDesign): string {
  const params = new URLSearchParams({ c: String(design.color) });
  params.set("s", encodePlaced(design.front));
  if (design.back.length) params.set("b", encodePlaced(design.back));
  return params.toString();
}
