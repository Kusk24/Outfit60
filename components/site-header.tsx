"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/provider";
import { scrollToHow } from "@/lib/scroll";
import { requestHowScroll, useAppState } from "@/lib/store";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { dict, href } = useI18n();
  const { savedLooks } = useAppState();

  const goHow = (event: React.MouseEvent) => {
    event.preventDefault();
    if (pathname === href("/")) {
      scrollToHow();
    } else {
      // The landing page does the smooth scroll itself; the router's own scroll would cancel it.
      requestHowScroll();
      router.push(href("/"), { scroll: false });
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-line bg-white px-5 py-3">
      <Link href={href("/")} className="flex shrink-0 items-center gap-2.5" aria-label={dict.nav.home}>
        <div
          lang="en"
          className="flex size-[38px] items-center justify-center bg-brand text-[15px] font-extrabold tracking-[-0.5px] text-white"
        >
          60
        </div>
        <div lang="en" className="leading-[1.05]">
          <div className="text-[10px] font-bold tracking-[3px] text-ink">UNIQLO</div>
          <div className="text-[13px] font-extrabold tracking-[0.5px]">OUTFIT IN 60</div>
        </div>
      </Link>
      <nav className="flex gap-3 text-[12px] font-semibold tracking-[0.4px] sm:gap-[18px]">
        <Link href={href("/#how")} onClick={goHow} className="hover:text-brand">
          {dict.nav.howItWorks}
        </Link>
        <Link href={href("/challenge/occasion")} className="hover:text-brand">
          {dict.nav.challenge}
        </Link>
        <Link href={href("/looks")} className="hover:text-brand">
          {dict.nav.myLooks}
          {savedLooks.length ? ` (${savedLooks.length})` : ""}
        </Link>
      </nav>
    </header>
  );
}
