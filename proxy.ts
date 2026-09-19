import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, hasLocale, LOCALE_COOKIE, LOCALES, type Locale } from "@/lib/i18n/config";

/** The language picked in the switcher, else the browser's preferred one, else English. */
function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  const ranked = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.map((entry) => entry.lang).find(hasLocale) ?? DEFAULT_LOCALE;
}

/** Sends URLs without a locale ("/", "/looks", …) to the same page under /en or /th. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (LOCALES.some((lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`))) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals and files with an extension (photos, fonts, icon).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
