import type { Prefs } from "./outfit";

export const FLOW_STEPS = ["occasion", "budget", "size", "style"] as const;
export type FlowStep = (typeof FLOW_STEPS)[number];

export const stepPath = (step: FlowStep) => `/challenge/${step}`;

export type StepError = "occasion" | "gender" | "size" | "style";

/** Why a step can't be left yet (a key into dict.flow.errors), or null when it's complete. */
export function stepError(step: FlowStep, prefs: Prefs): StepError | null {
  if (step === "occasion" && !prefs.occasion) return "occasion";
  if (step === "size" && !prefs.gender) return "gender";
  if (step === "size" && !prefs.size) return "size";
  if (step === "style" && !prefs.styles.length) return "style";
  return null;
}

/** First step that still needs an answer before an outfit can be built. */
export const firstIncompleteStep = (prefs: Prefs) => FLOW_STEPS.find((step) => stepError(step, prefs));
