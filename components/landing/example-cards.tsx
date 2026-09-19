"use client";

import Link from "next/link";
import { EXAMPLES } from "@/lib/data";
import { useI18n } from "@/lib/i18n/provider";
import { setPrefs } from "@/lib/store";

export function ExampleCards() {
  const { dict, href } = useI18n();

  return (
    <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
      {EXAMPLES.map((occ) => (
        <Link
          key={occ}
          href={href("/challenge/occasion")}
          onClick={() => setPrefs({ occasion: occ })}
          className="flex flex-col gap-1.5 border border-card px-5 py-[22px] hover:border-brand"
        >
          <span className="text-[17px] font-extrabold">{dict.landing.examples[occ].title}</span>
          <span className="text-[13px] text-muted">“{dict.landing.examples[occ].quote}”</span>
          <span className="mt-1.5 text-[12px] font-bold text-brand">{dict.landing.tryThis}</span>
        </Link>
      ))}
    </div>
  );
}
