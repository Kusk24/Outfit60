import Image from "next/image";
import { baht } from "@/lib/format";
import type { Product } from "@/lib/products";

export function ProductCard({ item, sizeLabel }: { item: Product; sizeLabel: string }) {
  return (
    <article className="border border-card">
      <div className="relative aspect-[3/4] bg-paper">
        <Image
          src={item.image}
          alt={item.name}
          fill
          loading="eager"
          sizes="(max-width: 640px) 100vw, 200px"
          className="object-cover"
        />
      </div>
      <div className="px-3.5 py-3">
        <p className="text-[11px] font-bold tracking-[1px] text-faint">{item.cat}</p>
        <h3 className="mt-0.5 text-[14px] font-extrabold">{item.name}</h3>
        <p className="mt-1 text-[15px] font-extrabold text-brand">{baht(item.price)}</p>
        <p className="mt-0.5 text-[12px] text-body">{item.sizes ? sizeLabel : "One size"}</p>
        <p className="mt-0.5 text-[12px] font-bold text-success">✓ In Stock</p>
      </div>
    </article>
  );
}
