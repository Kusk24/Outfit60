import type { Metadata } from "next";
import { ResultScreen } from "@/components/result/result-screen";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/result">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  return { title: getDictionary(lang).meta.pages.result };
}

export default function Page() {
  return <ResultScreen />;
}
