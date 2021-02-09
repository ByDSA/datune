import { ChromaticPattern } from "../../../voicings/relative/chromatic/ChromaticPattern";
import { StepType } from "./StepType";

export type StepReason = {
    type: StepType
}

export type StepReasonPattern = StepReason & { pattern: ChromaticPattern };
export type StepReasonRestNotes = StepReason & {};
export type StepReasonNear = StepReason & {};