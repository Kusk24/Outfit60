import { redirect } from "next/navigation";

export default async function ChallengePage({ params }: PageProps<"/[lang]/challenge">) {
  const { lang } = await params;
  redirect(`/${lang}/challenge/occasion`);
}
