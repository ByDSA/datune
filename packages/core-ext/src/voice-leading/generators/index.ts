import { generate as toNear } from "./near/generate";
import { generate as toKeyResolution } from "./key-resolution/generate";
import { generate as toVoicingResolution } from "./voicing-resolution/generate";
import { generateMultiple as multiple } from "./multiple/generate";
import { StepReason } from "./multiple/step-reason/StepReason";
import { type StepFilter, createAllowedPitchesFilter } from "./filters";

const staticModule = {
  toNear,
  toKeyResolution,
  toVoicingResolution,
  multiple,
  StepReason,
  processors: {
    createAllowedPitchesFilter,
  },
};

export {
  staticModule as StepsGen,
  type StepFilter,
};

export type * from "./multiple/step-reason/StepReasonInfo";
