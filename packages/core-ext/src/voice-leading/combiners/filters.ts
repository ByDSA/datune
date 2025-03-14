import type { SingleStepArray } from "../steps";

export type StepCombinerFilter = (singleStepCombination: SingleStepArray)=> boolean;

export function effectiveStepsFilter(combination: SingleStepArray): boolean {
  for (const ss of combination) {
    if (ss.interval !== 0)
      return true;
  }

  return false;
}
