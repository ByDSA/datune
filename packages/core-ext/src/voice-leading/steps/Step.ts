import type { Arrays } from "@datune/utils";
import type { Target } from "./Target";

export interface Step {
    applyTo(spnArray: Target): void;
}

export type StepOrNull = Step | null;

export type StepArray = Arrays.NonEmpty<Step>;

export function filterNonNullSteps(steps: StepOrNull[]): Step[] {
  return steps.filter((s) => !!s);
}
