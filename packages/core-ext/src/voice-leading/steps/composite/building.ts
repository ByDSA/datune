import type { SingleStepArray } from "../single/Array";
import type { CompositeStep } from "./CompositeStep";
import type { Interval } from "@datune/core";
import { NonEmptyArray } from "datils";
import { cache } from "./cache";

export type CompositeStepArray = NonEmptyArray<Interval | null | undefined>;

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

export function fromIntervals(...intervals: CompositeStepArray): CompositeStep {
  return cache.getOrCreate(intervals);
}

function singleStepsToArraySafe(singleSteps: SingleStepArray): CompositeStepArray | null {
  const ret: CompositeStepArray = [] as any;

  for (const sst of singleSteps) {
    const existing = ret[sst.index];

    if (existing !== undefined && existing !== sst.interval)
      return null;

    ret[sst.index] = sst.interval;
  }

  return ret;
}

function singleStepsToArrayWithOverwrite(singleSteps: SingleStepArray): CompositeStepArray {
  const ret: CompositeStepArray = [] as any;

  for (const sst of singleSteps)
    ret[sst.index] = sst.interval;

  return ret;
}
