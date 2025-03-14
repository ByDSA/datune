import type { SingleStepArray } from "../single/Array";
import type { Step, Target } from "../Step";
import { IntervalArray, SPNs } from "@datune/core";
import { lockr } from "@datune/utils";
import { from } from "../single/building";
import { compositeStepToSingleSteps } from "./cacheMaps";

export class CompositeStep implements Step {
  array: IntervalArray;

  private constructor(array: IntervalArray) {
    this.array = array;
    lockr(this.array);
  }

  // eslint-disable-next-line accessor-pairs
  get singleSteps(): SingleStepArray {
    let ret: SingleStepArray | undefined = compositeStepToSingleSteps.get(this);

    if (!ret) {
      ret = [] as unknown as SingleStepArray;

      for (let index = 0; index < this.array.length; index++) {
        const interval = this.array[index];

        if (interval === undefined)
          continue;

        ret.push(from(index, interval));
      }

      compositeStepToSingleSteps.set(this, ret);
    }

    return ret;
  }

  applyTo(spnArray: Target): void {
    this.array.forEach((interval, index) => {
      const spnAtIndex = spnArray[index];

      if (!spnAtIndex)
        return;

      if (interval !== null)
        spnArray[index] = SPNs.add(spnAtIndex, interval);
      else
        spnArray[index] = null;
    } );
  }

  toString() {
    return this.array.join(",");
  }
}
