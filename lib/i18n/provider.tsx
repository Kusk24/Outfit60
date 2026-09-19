"use client";

import { createContext, useContext } from "react";
import { localePath, type Locale } from "./config";
import type { Dictionary } from "./en";

interface I18nValue {
  lang: Locale;
  dict: Dictionary;
}

const I18nContext = createContext<I18nValue | null>(null);

/** Hands the server-loaded dictionary for the current locale to client components. */
export function I18nProvider({ lang, dict, children }: I18nValue & { children: React.ReactNode }) {
  return <I18nContext.Provider value={{ lang, dict }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return { ...value, href: (path: string) => localePath(value.lang, path) };
}
