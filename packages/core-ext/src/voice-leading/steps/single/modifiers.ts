import type { Interval } from "@datune/core";
import type { SingleStep } from "./SingleStep";
import { singleStepFrom } from "./building";

export function singleStepReIndex(singleStep: SingleStep, newIndex: number): SingleStep {
  return singleStepFrom(newIndex, singleStep.interval);
}

export function singleStepReInterval(singleStep: SingleStep, newInterval: Interval): SingleStep {
  return singleStepFrom(singleStep.index, newInterval);
}
