"use client";

import Link from "next/link";
import { EXAMPLES } from "@/lib/data";
import { setPrefs } from "@/lib/store";

export function ExampleCards() {
  return (
    <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
      {EXAMPLES.map((example) => (
        <Link
          key={example.occ}
          href="/challenge/occasion"
          onClick={() => setPrefs({ occasion: example.occ })}
          className="flex flex-col gap-1.5 border border-card px-5 py-[22px] hover:border-brand"
        >
          <span className="text-[17px] font-extrabold">{example.title}</span>
          <span className="text-[13px] text-muted">“{example.quote}”</span>
          <span className="mt-1.5 text-[12px] font-bold text-brand">TRY THIS →</span>
        </Link>
      ))}
    </div>
  );
}
