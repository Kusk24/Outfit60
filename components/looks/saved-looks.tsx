"use client";

import Image from "next/image";
import Link from "next/link";
import { baht } from "@/lib/format";
import { fill } from "@/lib/i18n/config";
import { occShort, styleName } from "@/lib/i18n/labels";
import { useI18n } from "@/lib/i18n/provider";
import { getProducts } from "@/lib/products";
import { useAppState, useHydrated } from "@/lib/store";

export function SavedLooks() {
  const hydrated = useHydrated();
  const { savedLooks } = useAppState();
  const { dict, href } = useI18n();
  const t = dict.looks;

  // Saved looks live in this browser's storage, so wait for it rather than flash the empty state.
  if (!hydrated) return null;

  if (!savedLooks.length) {
    return (
      <div className="mt-5 bg-paper px-6 py-[34px] text-center">
        <p className="text-[15px] font-bold">{t.emptyTitle}</p>
        <p className="mt-1.5 text-[13px] text-muted">{t.emptySub}</p>
        <Link
          href={href("/challenge/occasion")}
          className="mt-4 inline-block bg-brand px-6 py-3 text-[13px] font-extrabold tracking-[1px] text-white hover:bg-brand-dark"
        >
          {t.start}
        </Link>
      </div>
    );
  }

  return (
    <ul className="mt-5 flex flex-col gap-3">
      {savedLooks.map((look) => (
        <li key={look.id} className="flex items-center justify-between gap-3 border border-card px-[18px] py-4">
          <div>
            <p className="text-[15px] font-extrabold">
              {fill(dict.result.lookTitle, { occ: occShort(dict, look.occasion) })}
            </p>
            <p className="mt-0.5 text-[12px] text-muted">
              {fill(t.meta, { style: styleName(dict, look.style), size: look.size, secs: look.doneSecs })}
            </p>
            <div className="mt-2.5 flex gap-1.5">
              {getProducts(look.itemIds).map((item) => (
                <div key={item.id} className="relative h-12 w-9 bg-look">
                  <Image src={item.image} alt={item.name} fill sizes="36px" className="object-contain" />
                </div>
              ))}
            </div>
          </div>
          <p className="text-[16px] font-extrabold whitespace-nowrap text-brand">{baht(look.total)}</p>
        </li>
      ))}
    </ul>
  );
}
