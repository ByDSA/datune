import { Target } from "voice-leading/steps/Step";
import { MultipleGenResult } from "voice-leading/generators/multiple/generate";
import { SingleStepCombination } from "voice-leading/combiners/types";

export type VoiceLeadingResult = {
    targets: Target[];
    meta: {
        multipleGenResult: MultipleGenResult;
        singleStepCombinations: SingleStepCombination[];
    };
};
