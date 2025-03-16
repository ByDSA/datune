import type { SingleStepArray } from "../steps";
import type { StepOrNull } from "voice-leading/steps/Step";

export type Combination = SingleStepArray;

// Raw = con potenciales problemas de aplicar producto cartesiano o aplanar
export type RawCombination = StepOrNull[];
