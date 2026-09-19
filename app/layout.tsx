import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { RouteScrollReset } from "@/components/route-scroll-reset";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toast } from "@/components/toast";
import "./globals.css";

const description =
  "Tell us where you're going, your budget, and your size. We'll build your complete UNIQLO look in under 60 seconds.";

export const metadata: Metadata = {
  title: {
    default: "OutfitIn60 — 60 Seconds to Dressed",
    template: "%s · OutfitIn60",
  },
  description,
  openGraph: {
    title: "OutfitIn60 — 60 Seconds to Dressed",
    description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e60012",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  preload("/fonts/anuphan-latin.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
        <Toast />
        <RouteScrollReset />
      </body>
    </html>
  );
}
