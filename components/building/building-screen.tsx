"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { firstIncompleteStep, stepPath } from "@/lib/flow";
import { baht } from "@/lib/format";
import { fill } from "@/lib/i18n/config";
import { styleName } from "@/lib/i18n/labels";
import { useI18n } from "@/lib/i18n/provider";
import { effectiveBudget } from "@/lib/outfit";
import { completeBuild, useAppState, useHydrated } from "@/lib/store";

/** Seconds tick in real time; add ?speed=fast to the URL for a quick demo run. */
const tickMs = () => (new URLSearchParams(window.location.search).get("speed") === "fast" ? 130 : 1000);

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className="w-2.5" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <path d="M2 6.4 4.6 9 10 3.2" strokeLinecap="square" />
    </svg>
  );
}

export function BuildingScreen() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { prefs } = useAppState();
  const { href } = useI18n();
  const missing = firstIncompleteStep(prefs);
  const missingPath = missing ? href(stepPath(missing)) : null;

  useEffect(() => {
    if (hydrated && missingPath) router.replace(missingPath);
  }, [hydrated, missingPath, router]);

  if (!hydrated || missing) return <main className="flex-1" />;
  return <Countdown />;
}

function Countdown() {
  const router = useRouter();
  const { prefs } = useAppState();
  const { dict, href } = useI18n();
  const t = dict.building;
  const resultPath = href("/result");
  // The finish time is random so every run feels live: 34–54 seconds.
  const [target] = useState(() => 34 + Math.floor(Math.random() * 21));
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let ticks = 0;
    const timer = setInterval(() => {
      ticks += 1;
      setElapsed(ticks);
      if (ticks >= target) {
        clearInterval(timer);
        completeBuild(target);
        router.replace(resultPath);
      }
    }, tickMs());
    return () => clearInterval(timer);
  }, [target, router, resultPath]);

  const budget = effectiveBudget(prefs);
  const messages = [
    fill(t.messages.style, { style: styleName(dict, prefs.styles[0]) }),
    fill(t.messages.size, { size: prefs.size ?? "M" }),
    fill(t.messages.budget, { budget: baht(budget) }),
    t.messages.colours,
  ];
  const stepDone = (i: number) => elapsed >= target * (0.1 + i * 0.16);
  const stepActive = (i: number) => !stepDone(i) && (i === 0 || stepDone(i - 1));

  return (
    <main className="mx-auto w-full max-w-[520px] animate-fade-up-fast px-6 py-12 text-center">
      <p className="text-[11px] font-bold tracking-[2px] text-brand th:text-[13px]">{t.tag}</p>
      <p lang="en" className="mt-2 text-[76px] font-extrabold tracking-[-2px] tabular-nums">
        00:{String(Math.max(0, 60 - elapsed)).padStart(2, "0")}
      </p>
      <h1 className="mt-1 text-[20px] font-extrabold">{t.title}</h1>
      <div className="my-6 h-1.5 bg-track">
        <div
          className="h-1.5 bg-brand transition-[width] duration-150 ease-linear"
          style={{ width: `${Math.min(100, Math.round((elapsed / target) * 100))}%` }}
        />
      </div>
      <p className="min-h-5 animate-blink text-[14px] font-semibold text-brand" aria-live="polite">
        {messages[Math.floor(elapsed / 5) % messages.length]}
      </p>
      <ol className="mx-auto mt-6 flex max-w-[340px] flex-col gap-2.5 text-left">
        {t.steps.map((label, i) => (
          <li
            key={label}
            className={cn(
              "flex items-center gap-2.5 text-[14px] font-semibold",
              stepDone(i) ? "text-ink" : stepActive(i) ? "text-brand" : "text-mist",
            )}
          >
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold",
                stepDone(i) ? "bg-brand text-white" : "bg-track text-faint",
              )}
            >
              {stepDone(i) ? <CheckIcon /> : i + 1}
            </span>
            {label}
          </li>
        ))}
      </ol>
    </main>
  );
}
