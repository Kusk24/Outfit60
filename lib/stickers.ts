// The sticker set for the UT Creator Studio.
//
// Original artwork, drawn as SVG paths in a 100 x 100 box. Each sticker has a
// main shape in the colour the wearer picks, and optional accent detail that is
// filled with a contrasting tone so it reads on any colour.

export interface Sticker {
  id: string;
  main: string[];
  accent?: string[];
}

/**
 * A sticker that is a picture rather than a drawing: a public-domain artwork,
 * cut out and stored under /ut/art. These print as they are, so the ink colour
 * does not apply to them.
 */
export interface ArtSticker {
  id: string;
  /** Museum object id, kept so the credit can be checked. */
  source: string;
  artist: string;
  title: string;
  date: string;
  /** Width / height of the cut-out, so it is never squashed. */
  ratio: number;
}

/** Points of a star with `spikes` arms, as a path in the 100 box. */
function star(spikes: number, outer: number, inner: number, turn = -Math.PI / 2): string {
  const points: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = turn + (i * Math.PI) / spikes;
    points.push(`${(50 + Math.cos(angle) * radius).toFixed(2)} ${(50 + Math.sin(angle) * radius).toFixed(2)}`);
  }
  return `M${points.join("L")}Z`;
}

/** The same path repeated around the centre, for petals and rays. */
const around = (d: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${d}|rotate(${(360 / count) * i})`);

export const STICKERS: Sticker[] = [
  {
    id: "flame",
    main: [
      "M52 2c1 11 3 20 7 28 2-4 4-9 5-14 4 6 8 12 11 18 5 9 7 18 7 26a32 32 0 0 1-64 0c0-13 6-24 14-32 4-5 8-11 10-17 2 7 5 13 8 18 1-9 1-18 2-27z",
    ],
    accent: ["M50 46c5 8 10 14 10 20a10 10 0 0 1-20 0c0-6 5-12 10-20z"],
  },
  { id: "bolt", main: ["M62 4 26 54h18l-6 42 36-52H56z"] },
  { id: "star", main: [star(5, 46, 19)] },
  { id: "burst", main: [star(12, 48, 30)] },
  {
    id: "sparkle",
    main: ["M50 4c5 24 18 38 42 46-24 8-37 22-42 46-5-24-18-38-42-46 24-8 37-22 42-46z"],
  },
  { id: "heart", main: ["M50 90C22 70 8 55 8 38A21 21 0 0 1 50 27 21 21 0 0 1 92 38c0 17-14 32-42 52z"] },
  {
    id: "speech",
    main: ["M12 12h76a10 10 0 0 1 10 10v40a10 10 0 0 1-10 10H44l-20 20V72H12A10 10 0 0 1 2 62V22A10 10 0 0 1 12 12z"],
    accent: ["M26 34a5 5 0 1 0 .1 0zM48 34a5 5 0 1 0 .1 0zM70 34a5 5 0 1 0 .1 0z"],
  },
  {
    id: "cat",
    main: ["M22 40 30 12l20 14z", "M78 40 70 12 50 26z", "M50 24a31 29 0 1 0 .1 0z"],
    accent: [
      "M38 44a4.5 6 0 1 0 .1 0zM62 44a4.5 6 0 1 0 .1 0z",
      "M50 56l-5 4 5 3 5-3z",
      "M12 50h18v3H12zM70 50h18v3H70z",
    ],
  },
  {
    id: "skull",
    main: ["M50 2A38 36 0 0 0 12 38c0 13 6 23 14 29v15h48V67c8-6 14-16 14-29A38 36 0 0 0 50 2z"],
    accent: ["M33 38a11 12 0 1 0 .1 0zM67 38a11 12 0 1 0 .1 0z", "M50 58l-7 11h14z", "M39 74h5v8h-5zM56 74h5v8h-5z"],
  },
  {
    id: "sakura",
    main: around("M50 10a14 21 0 0 1 0 42 14 21 0 0 1 0-42z", 5),
    accent: ["M50 42a9 9 0 1 0 .1 0z"],
  },
  { id: "crown", main: ["M10 78h80l8-46-26 17-22-31-22 31-26-17z"] },
  {
    id: "smiley",
    main: ["M50 6a44 44 0 1 0 .1 0z"],
    accent: ["M36 38a6 8 0 1 0 .1 0zM64 38a6 8 0 1 0 .1 0z", "M28 58a22 22 0 0 0 44 0 22 13 0 0 1-44 0z"],
  },
  {
    id: "shuriken",
    main: [star(4, 48, 15) + "M50 41a9 9 0 1 0 .1 0z"],
  },
  {
    id: "kitsune",
    main: ["M22 6 35 24h30L78 6l5 30c0 27-15 47-33 58C32 83 17 63 17 36z"],
    accent: ["M30 44c5-5 12-5 17 0-5 5-12 5-17 0z", "M53 44c5-5 12-5 17 0-5 5-12 5-17 0z", "M44 70h12l-6 9z"],
  },
  {
    id: "torii",
    main: [
      "M6 16h88l-5 11H11zM14 31h72l-4 9H18zM24 40h10v54H24zM66 40h10v54H66zM30 54h40v9H30z",
    ],
  },
  {
    id: "onigiri",
    main: ["M50 8c15 0 35 44 35 60 0 9-6 15-15 15H30c-9 0-15-6-15-15 0-16 20-60 35-60z"],
    accent: ["M27 56h46v20a7 7 0 0 1-7 7H34a7 7 0 0 1-7-7z"],
  },
  {
    id: "ramen",
    main: ["M10 42h80c0 23-18 40-40 40S10 65 10 42z", "M26 86h48v8H26z"],
    accent: ["M22 50c9 7 18 10 28 10s19-3 28-10c-3 12-14 21-28 21S25 62 22 50z"],
  },
  {
    id: "katana",
    main: ["M8 86l6 6 56-56-6-6z", "M66 28l12 12 5-5-12-12z", "M80 14l10 10 8-8-10-10z"],
  },
  {
    id: "koi",
    main: [
      "M10 50c14-18 34-27 50-23 9 2 15 8 19 15-4 7-10 13-19 15-16 4-36-5-50-7z",
      "M84 33c7 4 12 10 12 17s-5 13-12 17c-3-11-3-23 0-34z",
    ],
    accent: ["M28 44a5 5 0 1 0 .1 0z"],
  },
  {
    id: "ghost",
    main: ["M50 6a32 32 0 0 0-32 32v50l11-9 10 9 11-9 10 9 11-9 11 9V38A32 32 0 0 0 50 6z"],
    accent: ["M37 38a6 8 0 1 0 .1 0zM63 38a6 8 0 1 0 .1 0z", "M43 56a7 7 0 0 0 14 0z"],
  },
  {
    id: "paw",
    main: [
      "M50 46c15 0 28 11 28 22s-13 15-28 15-28-4-28-15 13-22 28-22z",
      "M22 28a10 12 0 1 0 .1 0zM40 17a10 13 0 1 0 .1 0zM60 17a10 13 0 1 0 .1 0zM78 28a10 12 0 1 0 .1 0z",
    ],
  },
  {
    id: "headphones",
    main: [
      "M50 8C27 8 10 25 10 46v9h13v-9c0-16 12-28 27-28s27 12 27 28v9h13v-9c0-21-17-38-40-38z",
      "M6 50h15v36H6a6 6 0 0 1-6-6V56a6 6 0 0 1 6-6zM79 50h15a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6H79z",
    ],
  },
  {
    id: "eye",
    main: ["M50 24c21 0 38 15 44 26-6 11-23 26-44 26S12 61 6 50c6-11 23-26 44-26z"],
    accent: ["M50 32a18 18 0 1 0 .1 0z", "M42 41a5 5 0 1 0 .1 0z"],
  },
  {
    id: "speed",
    main: ["M4 20h72v9H4zM26 40h64v9H26zM2 60h68v9H2zM30 80h60v9H30z"],
  },
];

import { ART_STICKERS } from "./art-stickers";

export const STICKER_IDS = [
  ...STICKERS.map((sticker) => sticker.id),
  ...ART_STICKERS.map((sticker) => sticker.id),
];

export const getSticker = (id: string) => STICKERS.find((sticker) => sticker.id === id);

export const getArtSticker = (id: string) => ART_STICKERS.find((sticker) => sticker.id === id);

export const artImage = (id: string) => `/ut/art/${id}.webp`;

/** Ink colours a print can be run in. */
export const INKS = ["#e60012", "#111111", "#ffffff", "#1f3a6e", "#3f5136", "#b07d3f", "#c9a227", "#7a2f8f"];

/** Accent detail flips to whichever of black or white stays legible on the ink. */
export function accentOn(ink: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => Number.parseInt(ink.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#111111" : "#ffffff";
}
