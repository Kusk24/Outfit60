import { generate, type UtDesign } from "@/lib/ut";

/**
 * Draws a generated design in its own 100 x 100 box. The caller decides how big
 * that box is and where it sits, so the same graphic works on a tee and on a tile.
 */
export function UtGraphic({ design, className }: { design: UtDesign; className?: string }) {
  const marks = generate(design);

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {marks.map((mark, i) => {
        if (mark.kind === "circle") return <circle key={i} cx={mark.cx} cy={mark.cy} r={mark.r} fill={mark.fill} />;
        if (mark.kind === "ring")
          return (
            <circle key={i} cx={mark.cx} cy={mark.cy} r={mark.r} fill="none" stroke={mark.stroke} strokeWidth={mark.sw} />
          );
        if (mark.kind === "rect")
          return (
            <rect
              key={i}
              x={mark.x}
              y={mark.y}
              width={mark.w}
              height={mark.h}
              fill={mark.fill}
              transform={mark.rot ? `rotate(${mark.rot} ${mark.x + mark.w / 2} ${mark.y + mark.h / 2})` : undefined}
            />
          );
        return (
          <text
            key={i}
            x={50}
            y={mark.y}
            fill={mark.fill}
            fontSize={mark.size}
            fontWeight={800}
            letterSpacing={-mark.size * 0.03}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {mark.value}
          </text>
        );
      })}
    </svg>
  );
}
