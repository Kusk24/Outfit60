import type { Metadata } from "next";
import { CommunityGrid } from "@/components/community/community-grid";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/community">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  return { title: getDictionary(lang).meta.pages.community };
}

export default async function CommunityPage({ params }: PageProps<"/[lang]/community">) {
  const t = getDictionary((await params).lang as Locale).community;

  return (
    <main className="mx-auto w-full max-w-[760px] animate-fade-up-fast px-6 py-10">
      <div className="text-center">
        <h1 className="text-[30px] font-extrabold tracking-[-0.5px]">{t.title}</h1>
        <p className="mt-1.5 text-[14px] text-muted">{t.sub}</p>
      </div>
      <CommunityGrid />
    </main>
  );
}
