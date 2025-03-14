import type { Step, StepArray } from "./Step";
import type { SingleStepArray } from "./single/Array";
import { CompositeStep } from "./composite/CompositeStep";
import { SingleStep } from "./single/SingleStep";

export function flattenStep(step: Step): SingleStep[] {
  if (step instanceof SingleStep)
    return [step];
  else if (step instanceof CompositeStep)
    return step.singleSteps;

  throw new Error();
}

export function flattenStepArray(steps: StepArray): SingleStepArray {
  const ret: SingleStepArray = [] as any;

  for (const step of steps) {
    if (step instanceof SingleStep)
      ret.push(step);
    else if (step instanceof CompositeStep)
      ret.push(...step.singleSteps);
    else
      throw new Error();
  }

  return ret;
}
