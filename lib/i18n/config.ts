export const LOCALES = ["en", "th"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Remembers the language picked in the switcher; read by proxy.ts for URLs without a locale. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Saves the switcher choice so bare URLs ("/", shared links) open in the same language. */
export function rememberLocale(lang: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

export const hasLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

/** "/challenge/size" -> "/th/challenge/size"; "/" -> "/th". */
export const localePath = (lang: Locale, path: string) => `/${lang}${path === "/" ? "" : path}`;

/** Replaces {name} placeholders: fill("Step {n} of 4", { n: 2 }). */
export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
