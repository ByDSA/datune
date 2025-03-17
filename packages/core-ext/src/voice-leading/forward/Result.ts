import type { ApplyCombinationsResult } from "voice-leading/appliers/combination-appliers";
import type { MultipleGenResult } from "voice-leading/generators/multiple/generate";
import type { CombinerResult } from "voice-leading/combiners/combine-groups";
import { SPNArray } from "@datune/core";
import { type Target } from "voice-leading/steps/Target";
import { getAtomicStepsOf } from "./result-handlers/get-atomic-steps";
import { toChordMotionReasons } from "./result-handlers/chord-motion-reasons";
import { toReadableChordMotionReasons } from "./result-handlers/chord-motion-reasons-readable";

export type VoiceLeadingResult = {
    targets: Target[];
    meta: {
        base: SPNArray;
        multipleGenResult: MultipleGenResult;
        combinerResult: CombinerResult;
        applyCombinationsMeta: ApplyCombinationsResult["meta"];
    };
};

export function handleResult(result: VoiceLeadingResult) {
  return {
    toReadableChordMotionReasons: ()=>toReadableChordMotionReasons(result),
    showReadableChordMotionReasons: ()=>console.log(
      JSON.stringify(toReadableChordMotionReasons(result), null, 2),
    ),
    showTargetChords: ()=>console.log(
      JSON.stringify(toReadableChordMotionReasons(result).map(r=>r.chord), null, 2),
    ),
    toChordMotionReasons: ()=>toChordMotionReasons(result),
    getAtomicStepsOf: (target: Target) => getAtomicStepsOf(target, result),
  };
}
