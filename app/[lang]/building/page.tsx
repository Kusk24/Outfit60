import type { Metadata } from "next";
import { BuildingScreen } from "@/components/building/building-screen";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/building">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  return { title: getDictionary(lang).meta.pages.building };
}

export default function Page() {
  return <BuildingScreen />;
}
