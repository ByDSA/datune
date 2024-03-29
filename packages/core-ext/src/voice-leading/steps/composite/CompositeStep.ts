import { Arrays } from "@datune/utils";
import { Interval as ChromaticInterval } from "intervals/chromatic";
import { add } from "spns/chromatic";
import { Array as SingleStepArray, from } from "../single";
import { SPNOrNullArray, Step } from "../Step";
import cache from "./cache";

type IntervalArray = Arrays.NonEmpty<ChromaticInterval | null>;
export class CompositeStep implements Step {
  private constructor(private _singleSteps: SingleStepArray) {
  }

  static NONE: ChromaticInterval = 9999;

  static from(...singleMotions: SingleStepArray): CompositeStep {
    return cache.getOrCreate(singleMotions);
  }

  static fromIntervals(...intervals: IntervalArray): CompositeStep {
    const singleSteps = intervals2SingleSteps(intervals)
      .filter((singleStep) => singleStep.interval !== 0 && singleStep.interval !== CompositeStep.NONE);

    if (singleSteps.length === 0)
      throw new Error();

    return this.from(...<SingleStepArray>singleSteps);
  }

  static fromIntervalsKeepZero(...intervals: IntervalArray): CompositeStep {
    const singleSteps = intervals2SingleSteps(intervals)
      .filter((singleStep) => singleStep.interval !== CompositeStep.NONE);

    if (singleSteps.length == 0)
      throw new Error();

    return this.from(...<SingleStepArray>singleSteps);
  }

  get singleSteps(): SingleStepArray {
    return this._singleSteps;
  }

  apply(notes: SPNOrNullArray): SPNOrNullArray {
    const ret: SPNOrNullArray = [...notes];

    for (const sm of this._singleSteps) {
      if (!sm)
        continue;

      const { index } = sm;

      if (sm.interval === null)
        ret[index] = null;
      else if (+sm.interval === 0)
        continue;
      else {
        const retIndex = ret[index];
        ret[index] = retIndex ? (add(retIndex ,sm.interval) || null) : null;
      }
    }

    return ret;
  }
}

function intervals2SingleSteps(intervals: IntervalArray): SingleStepArray {
  return <SingleStepArray>intervals
    .map((interval, index) => from(index, interval));
}

export namespace CompositeStep {
    export const KEEP_U1 = CompositeStep.fromIntervals(0, 1);
    export const KEEP_U2 = CompositeStep.fromIntervals(0, 2);
    export const KEEP_D1 = CompositeStep.fromIntervals(0, -1);
    export const KEEP_D2 = CompositeStep.fromIntervals(0, -2);
    export const KEEP_NULL = CompositeStep.fromIntervals(0, null);
    export const U1_KEEP = CompositeStep.fromIntervals(1, 0);
    export const U1_U1 = CompositeStep.fromIntervals(1, 1);
    export const U1_U2 = CompositeStep.fromIntervals(1, 2);
    export const U1_D1 = CompositeStep.fromIntervals(1, -1);
    export const U1_D2 = CompositeStep.fromIntervals(1, -2);
    export const U1_NULL = CompositeStep.fromIntervals(1, null);
    export const U2_KEEP = CompositeStep.fromIntervals(2, 0);
    export const U2_U1 = CompositeStep.fromIntervals(2, 1);
    export const U2_U2 = CompositeStep.fromIntervals(2, 2);
    export const U2_D1 = CompositeStep.fromIntervals(2, -1);
    export const U2_D2 = CompositeStep.fromIntervals(2, -2);
    export const U2_NULL = CompositeStep.fromIntervals(2, null);
    export const D1_KEEP = CompositeStep.fromIntervals(-1, 0);
    export const D1_U1 = CompositeStep.fromIntervals(-1, 1);
    export const D1_U2 = CompositeStep.fromIntervals(-1, 2);
    export const D1_D1 = CompositeStep.fromIntervals(-1, -1);
    export const D1_D2 = CompositeStep.fromIntervals(-1, -2);
    export const D1_NULL = CompositeStep.fromIntervals(-1, null);
    export const D2_KEEP = CompositeStep.fromIntervals(-2, 0);
    export const D2_U1 = CompositeStep.fromIntervals(-2, 1);
    export const D2_U2 = CompositeStep.fromIntervals(-2, 2);
    export const D2_D1 = CompositeStep.fromIntervals(-2, -1);
    export const D2_D2 = CompositeStep.fromIntervals(-2, -2);
    export const D2_NULL = CompositeStep.fromIntervals(-2, null);
    export const NULL_KEEP = CompositeStep.fromIntervals(null, 0);
    export const NULL_U1 = CompositeStep.fromIntervals(null, 1);
    export const NULL_U2 = CompositeStep.fromIntervals(null, 2);
    export const NULL_D1 = CompositeStep.fromIntervals(null, -1);
    export const NULL_D2 = CompositeStep.fromIntervals(null, -2);
}
