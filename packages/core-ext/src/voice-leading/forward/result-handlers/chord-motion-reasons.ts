import type { Spn, Chord } from "@datune/core";
import type { Combination } from "voice-leading/combiners/types";
import type { StepReasonInfo } from "voice-leading/generators";
import type { VoiceLeadingResult } from "../Result";
import { getStepReasonsByIndex } from "voice-leading/generators/multiple/step-reason/ReasonStepMap";
import { flattenStepArray } from "voice-leading/steps/flattenSteps";
import { Target, targetToChord } from "voice-leading/steps/Target";
import { getAtomicStepsOf } from "./get-atomic-steps";

type Motion = {
  from: Spn;
  to: Spn | null;
};
type Reasons = StepReasonInfo[];
type ChordMotionReason = {
  target: Target;
  chord: Chord;
  motionReasons: [Motion, Reasons][];
};

export function toChordMotionReasons(result: VoiceLeadingResult): ChordMotionReason[] {
  const { reasonsMap } = result.meta.multipleGenResult.meta;

  return result
    .targets
    .map(t=> {
      const combination = result.meta.applyCombinationsMeta.reverseMap.get(t) as Combination;
      const atomicSteps = getAtomicStepsOf(t, result);
      const reasonsByIndex = getStepReasonsByIndex(atomicSteps, reasonsMap);
      const singleSteps = flattenStepArray(combination);
      const motionReasons: ChordMotionReason["motionReasons"] = singleSteps.map(s =>{
        const motion: Motion = {
          from: result.meta.base[s.index],
          to: t[s.index],
        };
        const reasons: Reasons = reasonsByIndex[s.index]!;

        return [motion, reasons];
      } );
      const ret: ChordMotionReason = {
        target: t,
        chord: targetToChord(t)!,
        motionReasons,
      };

      return ret;
    } );
}
