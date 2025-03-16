import type { Step } from "./Step";
import { CompositeStep } from "./composite/CompositeStep";
import { singleStepGetObjId, singleStepsGetObjId } from "./single/id";
import { SingleStep } from "./single/SingleStep";

export function stepGetObjId(step: Step): string {
  if (step instanceof SingleStep)
    return singleStepGetObjId(step);
  else if (step instanceof CompositeStep)
    return singleStepsGetObjId(step.singleSteps);

  throw new Error();
}

export function getUniqueSteps(steps: Step[]): Step[] {
  const addedIds = new Set<string>();
  const uniqueSteps = steps.reduce((acc, item) => {
    const id = stepGetObjId(item);

    if (!addedIds.has(id)) {
      acc.push(item);
      addedIds.add(id);
    }

    return acc;
  }, [] as Step[]);

  return uniqueSteps;
}
