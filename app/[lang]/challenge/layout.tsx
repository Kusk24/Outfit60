import type { Metadata } from "next";
import { FlowShell } from "@/components/challenge/flow-shell";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({ params }: LayoutProps<"/[lang]/challenge">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  return { title: getDictionary(lang).meta.pages.challenge };
}

export default function ChallengeLayout({ children }: LayoutProps<"/[lang]/challenge">) {
  return <FlowShell>{children}</FlowShell>;
}
