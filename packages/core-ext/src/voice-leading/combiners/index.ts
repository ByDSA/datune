import { combineStepGroups } from "./combine-groups";
import { processors } from "./processors";

const staticModule = {
  combineStepGroups,
  processors,
};

export {
  staticModule as Combiners,
};

export type {
  StepCombinerFilter,
} from "./processors/filters";

export type {
  StepCombinerTransform,
} from "./processors/transforms";
