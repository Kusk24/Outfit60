import type { Metadata } from "next";
import { Suspense } from "react";
import { UtStudio } from "@/components/ut/ut-studio";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/ut">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  return { title: getDictionary(lang).meta.pages.ut };
}

export default async function UtPage({ params }: PageProps<"/[lang]/ut">) {
  const t = getDictionary((await params).lang as Locale).ut;

  return (
    <main className="mx-auto w-full max-w-[900px] animate-fade-up-fast px-6 py-10">
      <div className="text-center">
        <h1 lang="en" className="text-[30px] font-extrabold tracking-[-0.5px]">
          {t.title}
        </h1>
        <p className="mx-auto mt-1.5 max-w-[520px] text-[14px] text-pretty text-muted">{t.sub}</p>
      </div>
      {/* The design lives in the query string, which a prerendered page cannot know. */}
      <Suspense fallback={<div className="h-[520px]" />}>
        <UtStudio />
      </Suspense>
    </main>
  );
}
