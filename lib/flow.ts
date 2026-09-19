import type { Prefs } from "./outfit";

export const FLOW_STEPS = ["occasion", "budget", "size", "style"] as const;
export type FlowStep = (typeof FLOW_STEPS)[number];

export const stepPath = (step: FlowStep) => `/challenge/${step}`;

/** The toast shown when a step can't be left yet, or null when it's complete. */
export function stepError(step: FlowStep, prefs: Prefs): string | null {
  if (step === "occasion" && !prefs.occasion) return "Pick an occasion to continue";
  if (step === "size" && !prefs.gender) return "Pick Men or Women to continue";
  if (step === "size" && !prefs.size) return "Pick your size to continue";
  if (step === "style" && !prefs.styles.length) return "Pick at least one style";
  return null;
}

/** First step that still needs an answer before an outfit can be built. */
export const firstIncompleteStep = (prefs: Prefs) => FLOW_STEPS.find((step) => stepError(step, prefs));
