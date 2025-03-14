import type { Arrays } from "@datune/utils";
import { SPN } from "@datune/core/spns/chromatic";

export type Target = (SPN | null)[];

export interface Step {
    applyTo(spnArray: Target): void;
}

export type StepOrNull = Step | null;

export type StepArray = Arrays.NonEmpty<Step>;

export function filterNonNullSteps(steps: StepOrNull[]): Step[] {
  return steps.filter((s) => !!s);
}
