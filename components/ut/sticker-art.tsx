import { accentOn, artImage, getArtSticker, getSticker, INKS } from "@/lib/stickers";

/** One sticker drawn in its own 100 x 100 box, in the ink it was placed in. */
export function StickerArt({ sticker, ink, className }: { sticker: string; ink: number; className?: string }) {
  const picture = getArtSticker(sticker);
  if (picture) {
    return (
      <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
        <image href={artImage(sticker)} x={0} y={0} width={100} height={100} preserveAspectRatio="xMidYMid meet" />
      </svg>
    );
  }
  if (!getSticker(sticker)) return null;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <StickerPaths sticker={sticker} fill={INKS[ink] ?? INKS[0]} />
    </svg>
  );
}

/** The bare paths, for callers that already own an <svg> — the tee canvas does. */
export function StickerPaths({ sticker, fill }: { sticker: string; fill: string }) {
  const picture = getArtSticker(sticker);
  if (picture) {
    // A picture prints as it is, so it keeps its own aspect inside the 100 box.
    const [w, h] = picture.ratio >= 1 ? [100, 100 / picture.ratio] : [100 * picture.ratio, 100];
    return <image href={artImage(sticker)} x={(100 - w) / 2} y={(100 - h) / 2} width={w} height={h} />;
  }
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
