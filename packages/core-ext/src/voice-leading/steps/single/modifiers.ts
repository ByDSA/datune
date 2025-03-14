import type { Interval } from "@datune/core";
import type { SingleStep } from "./SingleStep";
import { from } from "./building";

export function reIndex(singleStep: SingleStep, newIndex: number): SingleStep {
  return from(newIndex, singleStep.interval);
}

export function reInterval(singleStep: SingleStep, newInterval: Interval): SingleStep {
  return from(singleStep.index, newInterval);
}
