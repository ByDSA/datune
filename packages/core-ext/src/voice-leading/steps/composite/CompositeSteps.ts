import { Arrays } from "@datune/utils";
import { Interval as ChromaticInterval } from "@datune/core/intervals/chromatic";
import { Array as SingleStepArray, from as singleFrom } from "../single";
import { cache } from "./cache";
import type { CompositeStep } from "./CompositeStep";

type IntervalArray = Arrays.NonEmpty<ChromaticInterval | null>;

export namespace CompositeSteps {

  export const NONE: ChromaticInterval = 9999;

  export function from(...singleMotions: SingleStepArray): CompositeStep {
    return cache.getOrCreate(singleMotions);
  }

  export function fromIntervals(...intervals: IntervalArray): CompositeStep {
    const singleSteps = intervals2SingleSteps(intervals)
      .filter(
        (singleStep) => singleStep.interval !== 0 && singleStep.interval !== CompositeSteps.NONE,
      );

    if (singleSteps.length === 0)
      throw new Error();

    return CompositeSteps.from(...<SingleStepArray>singleSteps);
  }

  export function fromIntervalsKeepZero(...intervals: IntervalArray): CompositeStep {
    const singleSteps = intervals2SingleSteps(intervals)
      .filter((singleStep) => singleStep.interval !== CompositeSteps.NONE);

    if (singleSteps.length === 0)
      throw new Error();

    return CompositeSteps.from(...<SingleStepArray>singleSteps);
  }

    export const KEEP_U1 = CompositeSteps.fromIntervals(0, 1);
    export const KEEP_U2 = CompositeSteps.fromIntervals(0, 2);
    export const KEEP_D1 = CompositeSteps.fromIntervals(0, -1);
    export const KEEP_D2 = CompositeSteps.fromIntervals(0, -2);
    export const KEEP_NULL = CompositeSteps.fromIntervals(0, null);
    export const U1_KEEP = CompositeSteps.fromIntervals(1, 0);
    export const U1_U1 = CompositeSteps.fromIntervals(1, 1);
    export const U1_U2 = CompositeSteps.fromIntervals(1, 2);
    export const U1_D1 = CompositeSteps.fromIntervals(1, -1);
    export const U1_D2 = CompositeSteps.fromIntervals(1, -2);
    export const U1_NULL = CompositeSteps.fromIntervals(1, null);
    export const U2_KEEP = CompositeSteps.fromIntervals(2, 0);
    export const U2_U1 = CompositeSteps.fromIntervals(2, 1);
    export const U2_U2 = CompositeSteps.fromIntervals(2, 2);
    export const U2_D1 = CompositeSteps.fromIntervals(2, -1);
    export const U2_D2 = CompositeSteps.fromIntervals(2, -2);
    export const U2_NULL = CompositeSteps.fromIntervals(2, null);
    export const D1_KEEP = CompositeSteps.fromIntervals(-1, 0);
    export const D1_U1 = CompositeSteps.fromIntervals(-1, 1);
    export const D1_U2 = CompositeSteps.fromIntervals(-1, 2);
    export const D1_D1 = CompositeSteps.fromIntervals(-1, -1);
    export const D1_D2 = CompositeSteps.fromIntervals(-1, -2);
    export const D1_NULL = CompositeSteps.fromIntervals(-1, null);
    export const D2_KEEP = CompositeSteps.fromIntervals(-2, 0);
    export const D2_U1 = CompositeSteps.fromIntervals(-2, 1);
    export const D2_U2 = CompositeSteps.fromIntervals(-2, 2);
    export const D2_D1 = CompositeSteps.fromIntervals(-2, -1);
    export const D2_D2 = CompositeSteps.fromIntervals(-2, -2);
    export const D2_NULL = CompositeSteps.fromIntervals(-2, null);
    export const NULL_KEEP = CompositeSteps.fromIntervals(null, 0);
    export const NULL_U1 = CompositeSteps.fromIntervals(null, 1);
    export const NULL_U2 = CompositeSteps.fromIntervals(null, 2);
    export const NULL_D1 = CompositeSteps.fromIntervals(null, -1);
    export const NULL_D2 = CompositeSteps.fromIntervals(null, -2);
}

function intervals2SingleSteps(intervals: IntervalArray): SingleStepArray {
  const ret = intervals
    .map(
      (interval, index) => singleFrom(index, interval),
    );

  return ret as SingleStepArray;
}
