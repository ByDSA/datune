import { Voicing } from "@datune/core/voicings/chromatic";
import { Step } from "voice-leading/steps/Step";

export type IntervalResults = {
  voicing: Voicing;
  possibilities: Step[];
};
