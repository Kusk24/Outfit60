import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
import { RouteScrollReset } from "@/components/route-scroll-reset";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toast } from "@/components/toast";
import { hasLocale, LOCALES } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { I18nProvider } from "@/lib/i18n/provider";
import "../globals.css";

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    title: { default: meta.title, template: "%s · OutfitIn60" },
    description: meta.description,
    openGraph: { title: meta.title, description: meta.description, type: "website", locale: meta.ogLocale },
  };
}

export const viewport: Viewport = {
  themeColor: "#e60012",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  preload("/fonts/anuphan-latin.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  if (lang === "th") preload("/fonts/anuphan-thai.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  return (
    <html lang={lang}>
      <body className="flex min-h-screen flex-col">
        <I18nProvider lang={lang} dict={getDictionary(lang)}>
          <SiteHeader />
          {children}
          <SiteFooter />
          <Toast />
          <RouteScrollReset />
        </I18nProvider>
      </body>
    </html>
  );
}
