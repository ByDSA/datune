import type { SingleStepArray } from "../steps/single/Array";
import type { Step } from "../steps/Step";
import { compositeStepFromSingleSteps } from "../steps/composite/building";
import { Combination } from "../combiners/types";

/* Unsafe: no comprueba contradicciones.
   "combineStepGroups" ya elimina las contradicciones
*/
export function compactCombinationsUnsafe(combinations: Combination[]): Step[] {
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
