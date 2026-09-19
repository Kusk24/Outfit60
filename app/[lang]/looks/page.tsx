import type { Metadata } from "next";
import { SavedLooks } from "@/components/looks/saved-looks";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/looks">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  return { title: getDictionary(lang).meta.pages.looks };
}

export default async function LooksPage({ params }: PageProps<"/[lang]/looks">) {
  const title = getDictionary((await params).lang as Locale).meta.pages.looks;

  return (
    <main className="mx-auto w-full max-w-[560px] animate-fade-up-fast px-6 py-10">
      <h1 className="text-[30px] font-extrabold tracking-[-0.5px]">{title}</h1>
      <SavedLooks />
    </main>
  );
}
