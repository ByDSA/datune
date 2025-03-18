import type { SingleStepArray } from "../single/Array";
import type { Step } from "../Step";
import { Interval, Spns as N } from "@datune/core";
import { Arrays, lockr } from "@datune/utils";
import { from } from "../single/building";
import { Target } from "../Target";
import { compositeStepToSingleSteps } from "./cacheMaps";

export class CompositeStep implements Step {
  array: Arrays.NonEmpty<Interval | undefined>;

  private constructor(array: Arrays.NonEmpty<Interval | undefined>) {
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

      if (!spnAtIndex || interval === undefined)
        return;

      if (interval !== null)
        spnArray[index] = N.add(spnAtIndex, interval);
      else
        spnArray[index] = null;
    } );
  }

  toString() {
    return this.array.join(",");
  }
}
