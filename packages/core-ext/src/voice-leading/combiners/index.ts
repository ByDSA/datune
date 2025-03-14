import { combineStepGroups } from "./combine-groups";
import { effectiveStepsFilter } from "./filters";
import { createFillZerosTransform } from "./transforms";

const staticModule = {
  combineStepGroups,
  processors: {
    effectiveStepsFilter,
    createFillZerosTransform,
  },
};

export {
  staticModule as StepCombiners,
};

export type {
  StepCombinerFilter,
} from "./filters";

export type {
  StepCombinerTransform,
} from "./transforms";
