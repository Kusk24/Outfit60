import { accentOn, getSticker, INKS } from "@/lib/stickers";

/** One sticker drawn in its own 100 x 100 box, in the ink it was placed in. */
export function StickerArt({ sticker, ink, className }: { sticker: string; ink: number; className?: string }) {
  const art = getSticker(sticker);
  if (!art) return null;
  const fill = INKS[ink] ?? INKS[0];

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <StickerPaths sticker={sticker} fill={fill} />
    </svg>
  );
}

/** The bare paths, for callers that already own an <svg> — the tee canvas does. */
export function StickerPaths({ sticker, fill }: { sticker: string; fill: string }) {
  const art = getSticker(sticker);
  if (!art) return null;
  const accent = accentOn(fill);

  return (
    <>
      {art.main.map((d, i) => (
        <Path key={`m${i}`} d={d} fill={fill} />
      ))}
      {art.accent?.map((d, i) => (
        <Path key={`a${i}`} d={d} fill={accent} />
      ))}
    </>
  );
}

/** Paths may carry a "|rotate(deg)" suffix, which is how petals and rays repeat. */
function Path({ d, fill }: { d: string; fill: string }) {
  const [shape, transform] = d.split("|");
  return (
    <path
      d={shape}
      fill={fill}
      fillRule="evenodd"
      transform={transform ? transform.replace(")", " 50 50)") : undefined}
    />
  );
}
