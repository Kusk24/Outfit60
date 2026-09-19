"use client";

import { usePathname, useRouter } from "next/navigation";
import { BUDGET_CHALLENGE_CAP } from "@/lib/data";
import { FLOW_STEPS, stepError, stepPath, type FlowStep } from "@/lib/flow";
import { getPrefs, setPrefs, showToast } from "@/lib/store";

/** Back link, step counter, progress bar and the NEXT / BUILD button around each step. */
export function FlowShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const step = (FLOW_STEPS.find((s) => pathname.endsWith(`/${s}`)) ?? "occasion") as FlowStep;
  const index = FLOW_STEPS.indexOf(step);
  const stepNum = index + 1;
  const isLast = index === FLOW_STEPS.length - 1;

  const back = () => router.push(index === 0 ? "/" : stepPath(FLOW_STEPS[index - 1]));

  const next = () => {
    const prefs = getPrefs();
    const error = stepError(step, prefs);
    if (error) return showToast(error);
    if (step === "occasion" && prefs.occasion === "budget" && prefs.budget > BUDGET_CHALLENGE_CAP) {
      setPrefs({ budget: BUDGET_CHALLENGE_CAP });
    }
    router.push(isLast ? "/building" : stepPath(FLOW_STEPS[index + 1]));
  };

  return (
    <main className="mx-auto w-full max-w-[560px] animate-fade-up-fast px-6 pt-7 pb-10">
      <div className="flex items-center justify-between text-[12px] font-bold text-subtle">
        <button type="button" onClick={back}>
          ← Back
        </button>
        <span>Step {stepNum} of 4</span>
      </div>
      <div
        className="mt-3 mb-[30px] h-1 bg-track"
        role="progressbar"
        aria-label="Challenge progress"
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={stepNum}
      >
        <div className="h-1 bg-brand transition-[width] duration-300" style={{ width: `${stepNum * 25}%` }} />
      </div>

      {children}

      {isLast ? (
        <>
          <button
            type="button"
            onClick={next}
            className="mt-8 block w-full bg-brand p-[18px] text-center text-[17px] font-extrabold tracking-[1px] text-white hover:bg-brand-dark"
          >
            BUILD MY OUTFIT
          </button>
          <p className="mt-2.5 text-center text-[12px] font-semibold text-subtle">
            Your 60-second challenge starts now.
          </p>
        </>
      ) : (
        <button
          type="button"
          onClick={next}
          className="mt-8 block w-full bg-ink p-4 text-center text-[15px] font-extrabold tracking-[1px] text-white hover:bg-ink-soft"
        >
          NEXT →
        </button>
      )}
    </main>
  );
}
