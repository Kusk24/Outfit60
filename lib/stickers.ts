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
];

export const STICKER_IDS = STICKERS.map((sticker) => sticker.id);

export const getSticker = (id: string) => STICKERS.find((sticker) => sticker.id === id);

/** Ink colours a print can be run in. */
export const INKS = ["#e60012", "#111111", "#ffffff", "#1f3a6e", "#3f5136", "#b07d3f", "#c9a227", "#7a2f8f"];

/** Accent detail flips to whichever of black or white stays legible on the ink. */
export function accentOn(ink: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => Number.parseInt(ink.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#111111" : "#ffffff";
}
