import { applyCombination, applyCombinations, applyCombinationsWithMeta } from "./combination-appliers";
import { createDisallowInnerVoicingsFilter, createHasSomeVoicingFilter } from "./filters";
import { voiceCrossingFilter, voiceOverlappingFilter } from "./voices-interaction-filters";

const staticModule = {
  applyCombination,
  applyCombinations,
  applyCombinationsWithMeta,
  processors: {
    createHasSomeVoicingFilter,
    createDisallowInnerVoicingsFilter,
    voiceCrossingFilter,
    voiceOverlappingFilter,
  },
};

export type {
  CombinationApplierFilter,
} from "./filters";

export {
  staticModule as StepAppliers,
};
