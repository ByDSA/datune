import { InnerVoicingResult } from "voicings/findInnerVoicings";
import { StepReason } from "./StepReason";

export type StepReasonInfo = {
    reason: StepReason;
};

export type StepReasonVoicingResolutionInfo = StepReasonInfo & {
    innerVoicingResult: InnerVoicingResult;
 };

export type StepReasonRestNotesInfo = StepReasonInfo;

export type StepReasonNearInfo = StepReasonInfo;
