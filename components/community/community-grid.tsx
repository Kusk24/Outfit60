"use client";

import Link from "next/link";
import { LookBoard } from "@/components/look-board";
import { COMMUNITY } from "@/lib/data";
import { baht } from "@/lib/format";
import { fill } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";
import { getProducts } from "@/lib/products";
import { setPrefs } from "@/lib/store";

export function CommunityGrid() {
  const { dict, href } = useI18n();
  const t = dict.community;

  return (
    <div className="mt-[26px] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
      {COMMUNITY.map((look) => {
        const items = getProducts(look.items);
        const total = items.reduce((sum, item) => sum + item.price, 0);
        return (
          <article key={look.user} className="border border-card">
            <LookBoard items={items} className="h-[230px] p-3 sm:p-3" />
            <div className="px-4 py-3.5">
              <p lang="en" className="text-[15px] font-extrabold text-brand">
                {look.user}
              </p>
              <h2 className="mt-0.5 text-[14px] font-bold">{t.challenges[look.occ]}</h2>
              <p className="mt-1.5 flex gap-3.5 text-[12px] font-semibold text-body">
                <span>⏱ {fill(t.secs, { secs: look.time })}</span>
                <span>{baht(total)}</span>
              </p>
              <Link
                href={href("/challenge/occasion")}
                onClick={() => setPrefs({ occasion: look.occ })}
                className="mt-3 block border-2 border-ink py-[9px] text-center text-[11px] font-extrabold tracking-[1px] hover:bg-ink hover:text-white"
              >
                {t.tryThis}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
