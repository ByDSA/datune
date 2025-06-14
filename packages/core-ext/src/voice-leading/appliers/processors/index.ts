import { voiceCrossingFilter, voiceOverlappingFilter } from "./voices-interaction-filters";
import { createHasSomeIntervalSetFilter, createDisallowInnerIntervalSetsFilter } from "./filters";

export const processors = {
  createHasSomeIntervalSetFilter,
  createDisallowInnerIntervalSetsFilter,
  voiceCrossingFilter,
  voiceOverlappingFilter,
};
