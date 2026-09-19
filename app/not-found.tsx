import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-[560px] animate-fade-up-fast px-6 py-16 text-center">
      <p className="text-[11px] font-bold tracking-[2px] text-brand">#OUTFITIN60</p>
      <h1 className="mt-2 text-[30px] font-extrabold tracking-[-0.5px]">This page isn&apos;t in the lookbook</h1>
      <p className="mt-1.5 text-[14px] text-muted">Let&apos;s get you dressed instead.</p>
      <Link
        href="/"
        className="mt-6 inline-block bg-brand px-6 py-3 text-[13px] font-extrabold tracking-[1px] text-white hover:bg-brand-dark"
      >
        BACK TO HOME
      </Link>
    </main>
  );
}
