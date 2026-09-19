"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";

export default function NotFound() {
  const { dict, href } = useI18n();

  return (
    <main className="mx-auto w-full max-w-[560px] animate-fade-up-fast px-6 py-16 text-center">
      <p lang="en" className="text-[11px] font-bold tracking-[2px] text-brand">
        #OUTFITIN60
      </p>
      <h1 className="mt-2 text-[30px] font-extrabold tracking-[-0.5px]">{dict.notFound.title}</h1>
      <p className="mt-1.5 text-[14px] text-muted">{dict.notFound.sub}</p>
      <Link
        href={href("/")}
        className="mt-6 inline-block bg-brand px-6 py-3 text-[13px] font-extrabold tracking-[1px] text-white hover:bg-brand-dark"
      >
        {dict.notFound.back}
      </Link>
    </main>
  );
}
