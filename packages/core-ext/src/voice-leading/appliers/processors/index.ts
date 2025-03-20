import { voiceCrossingFilter, voiceOverlappingFilter } from "./voices-interaction-filters";
import { createHasSomeVoicingFilter, createDisallowInnerVoicingsFilter } from "./filters";

export const processors = {
  createHasSomeVoicingFilter,
  createDisallowInnerVoicingsFilter,
  voiceCrossingFilter,
  voiceOverlappingFilter,
};
