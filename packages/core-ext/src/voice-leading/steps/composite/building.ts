import type { SingleStepArray } from "../single/Array";
import type { CompositeStep } from "./CompositeStep";
import type { Arrays } from "@datune/utils";
import type { Interval } from "@datune/core";
import { cache } from "./cache";

export type CompositeArray = Arrays.NonEmpty<Interval | null | undefined>;

export function fromSingleStepsSafe(...singleSteps: SingleStepArray): CompositeStep | null {
  const array = singleStepsToArraySafe(singleSteps);

  if (array === null)
    return null;

  return fromIntervals(...array);
}

export function fromSingleSteps(...singleSteps: SingleStepArray): CompositeStep {
  const array = singleStepsToArrayWithOverwrite(singleSteps);

  return fromIntervals(...array);
}

export function fromIntervals(...intervals: CompositeArray): CompositeStep {
  return cache.getOrCreate(intervals);
}

function singleStepsToArraySafe(singleSteps: SingleStepArray): CompositeArray | null {
  const ret: CompositeArray = [] as any;

  for (const sst of singleSteps) {
    const existing = ret[sst.index];

    if (existing !== undefined && existing !== sst.interval)
      return null;

    ret[sst.index] = sst.interval;
  }

  return ret;
}

function singleStepsToArrayWithOverwrite(singleSteps: SingleStepArray): CompositeArray {
  const ret: CompositeArray = [] as any;

  for (const sst of singleSteps)
    ret[sst.index] = sst.interval;

  return ret;
}
