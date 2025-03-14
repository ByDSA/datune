import type { StepCombinerFilter } from "./combiners/filters";
import { SingleStepReason } from "./generators/multiple/step-reason/SingleStepReason";
import { StepCombinerTransform } from "./combiners/transforms";
import { type CombinationApplierFilter } from "./appliers/filters";
import { generateVoiceLeading } from "./forward/VoiceLeading";
import { Steps } from "./steps";
import { StepsGen } from "./generators";
import { StepCombiners } from "./combiners";
import { StepAppliers } from "./appliers";

const staticModule = {
  Steps,
  StepsGen,
  StepCombiners,
  Appliers: StepAppliers,
  generateVoiceLeading,
};

export type * from "./steps";

export type * from "./generators";

export type * from "./combiners";

export type * from "./appliers";

export {
  SingleStepReason,
  StepCombinerFilter,
  StepCombinerTransform,
  CombinationApplierFilter,
  staticModule as VoiceLeadings,
};
