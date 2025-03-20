import { toNear } from "./near/generate";
import { toKeyResolution } from "./key-resolution/generate";
import { toVoicingResolution } from "./voicing-resolution/generate";
import { multiple } from "./multiple/generate";
import { StepReason } from "./multiple/step-reason/StepReason";
import { type StepFilter, processors } from "./processors";

const staticModule = {
  toNear,
  toKeyResolution,
  toVoicingResolution,
  multiple,
  processors,
};

export {
  StepReason,
  staticModule as StepsGen,
  type StepFilter,
};

export type * from "./multiple/step-reason/StepReasonInfo";
