import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/products";

/**
 * The look laid out like a styling board: the pieces you wear stacked in the
 * middle, the layer and accessories down the side. The photos are cut out, so
 * they sit straight on the board.
 */
export function LookBoard({ items, className }: { items: Product[]; className?: string }) {
  const main = items.filter((item) => item.slot === "top" || item.slot === "dress" || item.slot === "bottom");
  const side = items.filter((item) => item.slot === "outer" || item.slot === "accessory");

  return (
    <div className={cn("flex items-stretch gap-3 bg-look p-4 sm:gap-5 sm:p-6", className)}>
      <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-2">
        {main.map((item) => (
          <LookImage key={item.id} item={item} className={item.slot === "bottom" ? "flex-[5]" : "flex-[4]"} />
        ))}
      </div>
      {side.length > 0 && (
        <div className="flex w-[24%] max-w-[130px] flex-col justify-center gap-3">
          {side.map((item) => (
            <LookImage key={item.id} item={item} className="flex-1" />
          ))}
        </div>
      )}
    </div>
  );
}

function LookImage({ item, className }: { item: Product; className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      <Image
        src={item.image}
        alt={item.name}
        fill
        loading="eager"
        sizes="(max-width: 640px) 90vw, 420px"
        className="object-contain"
      />
    </div>
  );
}
