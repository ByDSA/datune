import { Step } from "voice-leading/steps/Step";
import { Voicing } from "voicings/chromatic";

type IntervalResults = {
  voicing: Voicing;
  possibilities: Step[];
};

export default IntervalResults;
