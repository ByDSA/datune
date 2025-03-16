import { Combination } from "./types";

export type StepCombinerFilter = (combination: Combination)=> boolean;

export function effectiveStepsFilter(combination: Combination): boolean {
  for (const ss of combination) {
    if (ss.interval !== 0)
      return true;
  }

  return false;
}
