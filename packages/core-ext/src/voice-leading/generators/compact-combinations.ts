import type { SingleStepArray } from "../steps/single/Array";
import type { Step } from "../steps/Step";
import { fromSingleSteps as compositeStepFromSingleSteps } from "../steps/composite/building";
import { StepCombination } from "../combiners/types";

/* Unsafe: no comprueba contradicciones.
   Los generators ya generan los single steps sin contradicciones
*/
export function compactStepCombinationsUnsafe(combinations: StepCombination[]): Step[] {
  const ret: Step[] = [];

  for (const singleSteps of combinations) {
    switch (singleSteps.length) {
      case 0:
        continue;
      case 1:
        ret.push(singleSteps[0]);
        break;
      default:
      {
        const compositeStep = compositeStepFromSingleSteps(...singleSteps as SingleStepArray);

        if (compositeStep)
          ret.push(compositeStep);
      }
    }
  }

  return ret;
}
