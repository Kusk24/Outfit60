"use client";

import { useI18n } from "@/lib/i18n/provider";

export function SiteFooter() {
  const { dict } = useI18n();

  return (
    <footer className="mt-auto border-t border-line p-[22px] text-center text-[11px] font-semibold text-faint">
      {dict.footer}
    </footer>
  );
}
