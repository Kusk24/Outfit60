"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { STEP_LABELS } from "@/lib/data";
import { firstIncompleteStep, stepPath } from "@/lib/flow";
import { baht } from "@/lib/format";
import { effectiveBudget, styleName } from "@/lib/outfit";
import { completeBuild, useAppState, useHydrated } from "@/lib/store";

/** Seconds tick in real time; add ?speed=fast to the URL for a quick demo run. */
const tickMs = () => (new URLSearchParams(window.location.search).get("speed") === "fast" ? 130 : 1000);

export function BuildingScreen() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { prefs } = useAppState();
  const missing = firstIncompleteStep(prefs);

  useEffect(() => {
    if (hydrated && missing) router.replace(stepPath(missing));
  }, [hydrated, missing, router]);

  if (!hydrated || missing) return <main className="flex-1" />;
  return <Countdown />;
}

function Countdown() {
  const router = useRouter();
  const { prefs } = useAppState();
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
        router.replace("/result");
      }
    }, tickMs());
    return () => clearInterval(timer);
  }, [target, router]);

  const budget = effectiveBudget(prefs);
  const messages = [
    `Finding the best ${styleName(prefs.styles)} pieces...`,
    `Checking size ${prefs.size ?? "M"} availability...`,
    `Keeping your outfit under ${baht(budget)}...`,
    "Matching colours to your picks...",
  ];
  const stepDone = (i: number) => elapsed >= target * (0.1 + i * 0.16);
  const stepActive = (i: number) => !stepDone(i) && (i === 0 || stepDone(i - 1));

  return (
    <main className="mx-auto w-full max-w-[520px] animate-fade-up-fast px-6 py-12 text-center">
      <p className="text-[11px] font-bold tracking-[2px] text-brand">#OUTFITIN60 CHALLENGE</p>
      <p className="mt-2 text-[76px] font-extrabold tracking-[-2px] tabular-nums">
        00:{String(Math.max(0, 60 - elapsed)).padStart(2, "0")}
      </p>
      <h1 className="mt-1 text-[20px] font-extrabold">Building your look...</h1>
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
        {STEP_LABELS.map((label, i) => (
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
              {stepDone(i) ? "✓" : i + 1}
            </span>
            {label}
          </li>
        ))}
      </ol>
    </main>
  );
}
