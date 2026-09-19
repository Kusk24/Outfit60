"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { requestHowScroll, useAppState } from "@/lib/store";
import { scrollToHow } from "@/lib/scroll";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { savedLooks } = useAppState();

  const goHow = (event: React.MouseEvent) => {
    event.preventDefault();
    if (pathname === "/") {
      scrollToHow();
    } else {
      // The landing page does the smooth scroll itself; the router's own scroll would cancel it.
      requestHowScroll();
      router.push("/", { scroll: false });
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-line bg-white px-5 py-3">
      <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="UNIQLO Outfit in 60 — home">
        <div className="flex size-[38px] items-center justify-center bg-brand text-[15px] font-extrabold tracking-[-0.5px] text-white">
          60
        </div>
        <div className="leading-[1.05]">
          <div className="text-[10px] font-bold tracking-[3px] text-ink">UNIQLO</div>
          <div className="text-[13px] font-extrabold tracking-[0.5px]">OUTFIT IN 60</div>
        </div>
      </Link>
      <nav className="flex gap-3 text-[12px] font-semibold tracking-[0.4px] sm:gap-[18px]">
        <Link href="/#how" onClick={goHow} className="hover:text-brand">
          How It Works
        </Link>
        <Link href="/challenge/occasion" className="hover:text-brand">
          Outfit Challenge
        </Link>
        <Link href="/looks" className="hover:text-brand">
          My Looks{savedLooks.length ? `\u00a0(${savedLooks.length})` : ""}
        </Link>
      </nav>
    </header>
  );
}
