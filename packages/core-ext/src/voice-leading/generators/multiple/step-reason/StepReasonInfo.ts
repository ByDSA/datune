import { Voicing } from "@datune/core/voicings/chromatic";
import { StepReason } from "./StepReason";

export type StepReasonInfo = {
    reason: StepReason;
};

export type StepReasonVoicingResolutionInfo = StepReasonInfo & {
    tensionVoicing: Voicing;
 };

export type StepReasonRestNotesInfo = StepReasonInfo;

export type StepReasonNearInfo = StepReasonInfo;
