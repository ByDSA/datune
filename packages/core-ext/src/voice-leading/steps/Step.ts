import type { Target } from "./Target";
import { NonEmptyArray } from "datils";

export interface Step {
    applyTo(spnArray: Target): void;
}

export type StepOrNull = Step | null;

export type StepArray = NonEmptyArray<Step>;

export function filterNonNullSteps(steps: StepOrNull[]): Step[] {
  return steps.filter((s) => !!s);
}
