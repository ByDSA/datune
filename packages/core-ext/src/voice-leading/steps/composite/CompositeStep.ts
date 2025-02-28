/* eslint-disable no-continue */
import { add } from "@datune/core/spns/symbolic/chromatic/modifiers";
import { Array as SingleStepArray } from "../single";
import { SPNOrNullArray, Step } from "../Step";

export class CompositeStep implements Step {
  #singleSteps: SingleStepArray;

  private constructor(singleSteps: SingleStepArray) {
    this.#singleSteps = singleSteps;
  }

  // eslint-disable-next-line accessor-pairs
  get singleSteps(): SingleStepArray {
    return this.#singleSteps;
  }

  apply(notes: SPNOrNullArray): SPNOrNullArray {
    const ret: SPNOrNullArray = [...notes];

    for (const sm of this.#singleSteps) {
      if (!sm)
        continue;

      const { index } = sm;

      if (sm.interval === null)
        ret[index] = null;
      else if (+sm.interval === 0)
        continue;
      else {
        const retIndex = ret[index];

        ret[index] = retIndex ? (add(retIndex, sm.interval) || null) : null;
      }
    }

    return ret;
  }
}
