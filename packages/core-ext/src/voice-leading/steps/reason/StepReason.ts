import { Voicing } from "voicings/chromatic";
import { StepType } from "./StepType";

export type StepReason = {
    type: StepType;
};

export type StepReasonVoicing = StepReason & { voicing: Voicing };

export type StepReasonRestNotes = StepReason & {};

export type StepReasonNear = StepReason & {};
