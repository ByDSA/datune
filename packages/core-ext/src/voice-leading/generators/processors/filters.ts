import type { Step } from "voice-leading/steps/Step";
import type { PitchArray, SpnArray } from "@datune/core";

export type StepFilter = (step: Step)=> boolean;

export function createAllowedPitchesFilter(base: SpnArray, pitches: PitchArray): StepFilter {
  return (step: Step) => {
    const target = [...base];

    step.applyTo(target);
    const targetPitches = target.map(n=>n.pitch);

    return targetPitches.every(p=>pitches.includes(p));
  };
}
