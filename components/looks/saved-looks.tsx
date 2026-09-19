"use client";

import Image from "next/image";
import Link from "next/link";
import { baht } from "@/lib/format";
import { getProducts } from "@/lib/products";
import { useAppState, useHydrated } from "@/lib/store";

export function SavedLooks() {
  const hydrated = useHydrated();
  const { savedLooks } = useAppState();

  // Saved looks live in this browser's storage, so wait for it rather than flash the empty state.
  if (!hydrated) return null;

  if (!savedLooks.length) {
    return (
      <div className="mt-5 bg-paper px-6 py-[34px] text-center">
        <p className="text-[15px] font-bold">No saved looks yet</p>
        <p className="mt-1.5 text-[13px] text-muted">Complete a 60-second challenge and tap SAVE LOOK.</p>
        <Link
          href="/challenge/occasion"
          className="mt-4 inline-block bg-brand px-6 py-3 text-[13px] font-extrabold tracking-[1px] text-white hover:bg-brand-dark"
        >
          START THE CHALLENGE
        </Link>
      </div>
    );
  }

  return (
    <ul className="mt-5 flex flex-col gap-3">
      {savedLooks.map((look) => (
        <li key={look.id} className="flex items-center justify-between gap-3 border border-card px-[18px] py-4">
          <div>
            <p className="text-[15px] font-extrabold">{look.title}</p>
            <p className="mt-0.5 text-[12px] text-muted">{look.meta}</p>
            <div className="mt-2.5 flex gap-1.5">
              {getProducts(look.itemIds).map((item) => (
                <div key={item.id} className="relative h-12 w-9 border border-card bg-paper">
                  <Image src={item.image} alt={item.name} fill sizes="36px" className="object-cover" />
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
