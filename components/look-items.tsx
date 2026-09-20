import { baht } from "@/lib/format";
import { fill } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Product } from "@/lib/products";

/** What the look is made of: role, product, size and price. */
export function LookItems({
  items,
  size,
  dict,
  lang,
}: {
  items: Product[];
  size: string;
  dict: Dictionary;
  lang: Locale;
}) {
  return (
    <ul className="mt-5 flex flex-col">
      {items.map((item) => (
        <li key={item.id} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
          <div className="min-w-0">
            <p className="text-[11px] font-bold tracking-[1px] text-faint">{dict.slots[item.slot]}</p>
            <p className="mt-0.5 text-[14px] font-extrabold" lang={lang === "th" ? "th" : "en"}>
              {lang === "th" ? item.nameTh : item.name}
            </p>
            <p className="mt-0.5 text-[12px] text-body">
              {item.sizes ? fill(dict.result.size, { size }) : dict.result.oneSize} · {dict.result.inStock}
            </p>
          </div>
          <p className="text-[15px] font-extrabold whitespace-nowrap text-brand">{baht(item.price)}</p>
        </li>
      ))}
    </ul>
  );
}
