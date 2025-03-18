import type { VoiceLeadingResult } from "../Result";
import { SpnArray, Spn } from "@datune/core";
import { Voicings as V } from "@datune/core";
import { type Target } from "voice-leading/steps/Target";
import { stringifyStepReasonInfo } from "voice-leading/generators/multiple/step-reason/StepReasonInfo";
import { toChordMotionReasons } from "./chord-motion-reasons";

type HumanizeResultRet = {
  chord: string;
  motions: Record<string, string[]>;
}[];
export function toReadableChordMotionReasons(result: VoiceLeadingResult): HumanizeResultRet {
  const original = toChordMotionReasons(result);
  const unsortedWithTarget = original.map(c=> {
    return {
      target: c.target,
      chord: c.chord.toString() + " (" + c.target.map(String) + ")",
      motions: c.motionReasons.reduce((acc, mr) => {
        const motion = mr[0].from.toString() + " => " + (mr[0].to?.toString() ?? "null");

        acc[motion] = mr[1].map(info=>stringifyStepReasonInfo(info, {
          base: result.meta.base,
        } ))!;

        return acc;
      }, {} as HumanizeResultRet[0]["motions"]),
    };
  } );

  return unsortedWithTarget
    .sort((a, b)=> sortingScoreTarget(b.target, result.meta.base)
    - sortingScoreTarget(a.target, result.meta.base))
    .map(mr =>{
      const { target, ...rest } = mr;

      return rest;
    } )
    .sort((a, b)=> {
      return sortingScoreFinal(b) - sortingScoreFinal(a);
    } );
}

function sortingScoreTarget(target: Target, base: SpnArray): number {
  let distance = 0;

  for (let i = 0; i < target.length; i++) {
    if (target[i] !== null)
      distance += Math.abs(+(target[i] as Spn) - +base[i]);
  }

  return -distance;
}

function sortingScoreFinal(hum: HumanizeResultRet[0]): number {
  let resolutionCount = 0;
  let tritoneCount = 0;
  let nearCount = 0;

  for (const [_, reasons] of Object.entries(hum.motions)) {
    for (const r of reasons) {
      if (r.includes("Resolution"))
        resolutionCount++;
      else if (reasons.length === 1 && r.includes("Near"))
        nearCount++;

      if (r.includes(V.TRITONE.toString()))
        tritoneCount++;
    }
  }

  return (tritoneCount * 10) + resolutionCount - nearCount;
}
