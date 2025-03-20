import { applyCombination, applyCombinations, applyCombinationsWithMeta } from "./combination-appliers";
import { processors } from "./processors";

const staticModule = {
  applyCombination,
  applyCombinations,
  applyCombinationsWithMeta,
  processors,
};

export type {
  CombinationApplierFilter,
} from "./processors/filters";

export {
  staticModule as Appliers,
};
