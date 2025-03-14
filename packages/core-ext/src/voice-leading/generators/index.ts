import { generate as toNearest } from "./nearest/generate";
import { generate as toKeyResolution } from "./key-resolution/generate";
import { generate as toVoicingResolution } from "./voicing-resolution/generate";
import { generateMultiple as multiple } from "./multiple/generate";
import { SingleStepReason } from "./multiple/step-reason/SingleStepReason";

const staticModule = {
  toNearest,
  toKeyResolution,
  toVoicingResolution,
  multiple,
  SingleStepReason,
};

export {
  staticModule as StepsGen,
};

export type * from "./multiple/step-reason/SingleStepReasonInfo";
