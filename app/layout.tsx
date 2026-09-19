import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OutfitIn60",
  description: "UNIQLO Thailand #OutfitIn60 campaign concept.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
