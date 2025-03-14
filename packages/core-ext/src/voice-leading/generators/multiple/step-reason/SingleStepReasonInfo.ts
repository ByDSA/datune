import { Voicing } from "@datune/core/voicings/chromatic";
import { SingleStepReason } from "./SingleStepReason";

export type SingleStepReasonInfo = {
    reason: SingleStepReason;
};

export type SingleStepReasonVoicingResolutionInfo = SingleStepReasonInfo & {
    tensionVoicing: Voicing;
 };

export type SingleStepReasonRestNotesInfo = SingleStepReasonInfo;

export type SingleStepReasonNearInfo = SingleStepReasonInfo;
