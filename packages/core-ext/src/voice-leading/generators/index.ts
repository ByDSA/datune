import { toNear } from "./near/generate";
import { toKeyResolution } from "./key-resolution/generate";
import { toIntervalSetResolution } from "./interval-set-resolution/generate";
import { multiple } from "./multiple/generate";
import { StepReason } from "./multiple/step-reason/StepReason";
import { type StepFilter, processors } from "./processors";

const staticModule = {
  toNear,
  toKeyResolution,
  toIntervalSetResolution,
  multiple,
  processors,
};

export {
  StepReason,
  staticModule as StepsGen,
  type StepFilter,
};

export type * from "./multiple/step-reason/StepReasonInfo";
