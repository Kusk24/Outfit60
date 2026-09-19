import Link from "next/link";
import { ExampleCards } from "@/components/landing/example-cards";
import { HowScrollOnArrival } from "@/components/landing/how-scroll-on-arrival";
import { HOW_STEPS } from "@/lib/data";

export default function LandingPage() {
  return (
    <main className="animate-fade-up">
      <HowScrollOnArrival />
      <section className="mx-auto flex max-w-[680px] flex-col items-center gap-[18px] px-6 pt-16 pb-12 text-center">
        <div className="border border-ink px-3.5 py-[5px] text-[11px] font-bold tracking-[1.5px]">#OUTFITIN60</div>
        <h1 className="text-[52px] leading-[1.02] font-extrabold tracking-[-1.5px]">
          60 Seconds
          <br />
          to Dressed
        </h1>
        <p lang="th" className="text-[22px] font-bold text-brand">
          ครบลุคใน 60 วิ
        </p>
        <p className="max-w-[440px] text-[16px] leading-[1.55] text-pretty text-body">
          Tell us where you&apos;re going, your budget, and your size. We&apos;ll build your complete UNIQLO look in
          under 60 seconds.
        </p>
        <div
          aria-hidden
          className="my-2.5 flex size-[150px] animate-pulse-ring flex-col items-center justify-center gap-0.5 rounded-full border-[6px] border-ink"
        >
          <div className="text-[38px] font-extrabold tracking-[-1px] tabular-nums">00:60</div>
          <div className="text-[9px] font-bold tracking-[2px] text-brand">YOUR TIME</div>
        </div>
        <Link
          href="/challenge/occasion"
          className="block w-full max-w-[420px] bg-brand px-[34px] py-[18px] text-[16px] font-extrabold tracking-[1px] text-white hover:bg-brand-dark"
        >
          START THE 60-SECOND CHALLENGE
        </Link>
        <p className="text-[13px] font-medium text-subtle">Your occasion. Your budget. Your size. One complete look.</p>
      </section>

      <section id="how" className="bg-paper px-6 py-12">
        <div className="mx-auto max-w-[760px]">
          <h2 className="text-center text-[12px] font-bold tracking-[2px] text-brand">HOW IT WORKS</h2>
          <ol className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
            {HOW_STEPS.map((step) => (
              <li key={step.n} className="bg-white px-4 py-5 text-center">
                <div className="text-[22px] font-extrabold text-brand">{step.n}</div>
                <div className="mt-1 text-[14px] font-bold">{step.t}</div>
                <div className="mt-1 text-[12px] text-muted">{step.s}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[760px] px-6 py-12">
        <h2 className="text-center text-[24px] font-extrabold">Try a challenge</h2>
        <ExampleCards />
        <div className="mt-11 bg-ink px-5 py-9 text-center text-white">
          <p className="text-[26px] font-extrabold tracking-[-0.5px]">
            Less time choosing.
            <br />
            More time living.
          </p>
          <p className="mt-2.5 text-[13px] font-semibold text-mist">#OutfitIn60 · #ครบลุคใน60วิ</p>
        </div>
        <div className="mt-9 text-center">
          <h2 className="text-[18px] font-extrabold">OutfitIn60 Community</h2>
          <p className="mt-1 text-[13px] text-muted">See how other people completed their look.</p>
          <Link
            href="/community"
            className="mt-3.5 inline-block border-2 border-ink px-[26px] py-3 text-[13px] font-extrabold tracking-[1px] hover:bg-ink hover:text-white"
          >
            EXPLORE LOOKS
          </Link>
        </div>
      </section>
    </main>
  );
}
