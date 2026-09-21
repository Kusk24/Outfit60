"use client";

import Image from "next/image";
import { useRef } from "react";
import { StickerPaths } from "@/components/ut/sticker-art";
import { INKS } from "@/lib/stickers";
import { UT_BLANK } from "@/lib/ut-blank";
import type { Placed, Side } from "@/lib/ut";

interface TeeCanvasProps {
  image: string;
  alt: string;
  side: Side;
  placed: Placed[];
  selected: number | null;
  onSelect: (index: number | null) => void;
  onMove: (index: number, x: number, y: number) => void;
}

/**
 * The tee with its stickers. The print area is a square, so SVG units stay
 * square and a circle never comes out an ellipse. Sticker positions are
 * percentages of that square, which keeps a design identical at any width.
 */
export function TeeCanvas({ image, alt, side, placed, selected, onSelect, onMove }: TeeCanvasProps) {
  const print = UT_BLANK.print[side];
  const area = useRef<HTMLDivElement>(null);
  const dragging = useRef<number | null>(null);

  const startDrag = (index: number) => (event: React.PointerEvent) => {
    event.preventDefault();
    dragging.current = index;
    onSelect(index);
    (event.currentTarget as Element).setPointerCapture?.(event.pointerId);
  };

  const drag = (event: React.PointerEvent) => {
    if (dragging.current === null) return;
    const box = area.current?.getBoundingClientRect();
    if (!box) return;
    onMove(
      dragging.current,
      Math.min(100, Math.max(0, ((event.clientX - box.left) / box.width) * 100)),
      Math.min(100, Math.max(0, ((event.clientY - box.top) / box.height) * 100)),
    );
  };

  const endDrag = () => {
    dragging.current = null;
  };

  return (
    <div className="relative mx-auto w-full max-w-[420px] bg-look" style={{ aspectRatio: UT_BLANK.ratio }}>
      <Image
        src={image}
        alt={alt}
        fill
        loading="eager"
        sizes="(max-width: 768px) 92vw, 420px"
        className={side === "back" ? "object-contain -scale-x-100" : "object-contain"}
      />
      <div
        ref={area}
        className="absolute aspect-square touch-none"
        style={{
          left: `${print.x}%`,
          top: `${print.y}%`,
          width: `${print.w}%`,
          transform: "translate(-50%, -50%)",
        }}
        onPointerMove={drag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <svg viewBox="0 0 100 100" className="size-full overflow-visible">
          {placed.map((item, index) => (
            <g
              key={index}
              transform={`translate(${item.x} ${item.y}) rotate(${item.rotation}) scale(${item.size / 100})`}
              className="cursor-move"
              onPointerDown={startDrag(index)}
            >
              <g transform="translate(-50 -50)">
                {/* An invisible pad makes thin stickers comfortable to grab. */}
                <rect x={0} y={0} width={100} height={100} fill="transparent" />
                <StickerPaths sticker={item.sticker} fill={INKS[item.ink] ?? INKS[0]} />
                {selected === index && (
                  <rect
                    x={-1}
                    y={-1}
                    width={102}
                    height={102}
                    fill="none"
                    stroke="#e60012"
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </g>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
