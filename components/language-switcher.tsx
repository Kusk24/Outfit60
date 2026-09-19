"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { LOCALES, rememberLocale, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";

const LABELS: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  th: { short: "ไทย", name: "ภาษาไทย" },
};

/** EN / ไทย toggle: the same page in the other language, remembered for next time. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const { lang, dict } = useI18n();
  const rest = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), "");

  return (
    <div role="group" aria-label={dict.nav.language} className={cn("flex shrink-0 border border-ink", className)}>
      {LOCALES.map((target) => {
        const active = target === lang;
        return (
          <Link
            key={target}
            href={`/${target}${rest}`}
            lang={target}
            hrefLang={target}
            aria-label={LABELS[target].name}
            aria-current={active ? "true" : undefined}
            onClick={() => rememberLocale(target)}
            className={cn(
              "px-2 py-[3px] text-[11px] font-bold",
              active ? "bg-ink text-white" : "bg-white text-ink hover:bg-paper",
            )}
          >
            {LABELS[target].short}
          </Link>
        );
      })}
    </div>
  );
}
