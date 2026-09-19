import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/products";

/** Side-by-side product photos standing in for a "look photo". */
export function LookCollage({ items, className }: { items: Product[]; className?: string }) {
  return (
    <div
      className={cn("grid gap-px bg-card", className)}
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((item) => (
        <div key={item.id} className="relative bg-paper">
          <Image src={item.image} alt={item.name} fill loading="eager" sizes="120px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
