import type { StepCombinerFilter, StepCombinerTransform } from "./combiners";
import { StepReason } from "./generators/multiple/step-reason/StepReason";
import { type CombinationApplierFilter } from "./appliers/processors/filters";
import { generate } from "./forward/VoiceLeading";
import { CompositeStep, SingleStep, Steps } from "./steps";
import { StepsGen } from "./generators";
import { Combiners } from "./combiners";
import { Appliers } from "./appliers";
import { handleResult } from "./forward/Result";

const staticModule = {
  Steps,
  StepsGen,
  Combiners,
  Appliers,
  generate,
  handleResult,
};

export type {
  Step,
  SingleStepArray,
} from "./steps";

export type * from "./generators";

export type * from "./combiners";

export type * from "./appliers";

export {
  SingleStep,
  CompositeStep,
  StepReason,
  StepCombinerFilter,
  StepCombinerTransform,
  CombinationApplierFilter,
  staticModule as VoiceLeadings,
};
