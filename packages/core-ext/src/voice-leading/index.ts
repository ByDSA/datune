import type { StepCombinerFilter } from "./combiners/filters";
import { StepReason } from "./generators/multiple/step-reason/StepReason";
import { StepCombinerTransform } from "./combiners/transforms";
import { type CombinationApplierFilter } from "./appliers/filters";
import { generateVoiceLeading } from "./forward/VoiceLeading";
import { CompositeStep, SingleStep, Steps } from "./steps";
import { StepsGen } from "./generators";
import { StepCombiners } from "./combiners";
import { StepAppliers } from "./appliers";
import { handleResult } from "./forward/Result";

const staticModule = {
  Steps,
  StepsGen,
  Combiners: StepCombiners,
  Appliers: StepAppliers,
  generate: generateVoiceLeading,
  handleResult,
  SingleStep,
  CompositeStep,
};

export type {
  Step,
  SingleStepArray,
} from "./steps";

export type * from "./generators";

export type * from "./combiners";

export type * from "./appliers";

export {
  StepReason,
  StepCombinerFilter,
  StepCombinerTransform,
  CombinationApplierFilter,
  staticModule as VoiceLeadings,
};
