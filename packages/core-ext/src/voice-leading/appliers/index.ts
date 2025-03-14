import { applyCombination, applyCombinations, applyCombinationsWithMeta } from "./combination-appliers";
import { createAllPitchesInEveryKeyFilter, createAllPitchesInSomeKeyFilter, createHasSomeVoicingFilter } from "./filters";
import { voiceCrossingFilter, voiceOverlappingFilter } from "./voices-interaction-filters";

const staticModule = {
  applyCombination,
  applyCombinations,
  applyCombinationsWithMeta,
  processors: {
    createAllPitchesInEveryKeyFilter,
    createAllPitchesInSomeKeyFilter,
    createHasSomeVoicingFilter,
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
