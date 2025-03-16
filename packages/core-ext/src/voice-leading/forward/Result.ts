import type { ApplyCombinationsResult } from "voice-leading/appliers/combination-appliers";
import type { Step, Target } from "voice-leading/steps/Step";
import type { MultipleGenResult } from "voice-leading/generators/multiple/generate";
import type { CombinerResult } from "voice-leading/combiners/combine-groups";
import type { Combination } from "voice-leading/combiners/types";
import { SPNArray, Chords, PitchArray } from "@datune/core";
import { getUniqueSteps } from "voice-leading/steps/id";
import { getStepReasonsByIndex } from "voice-leading/generators/multiple/step-reason/ReasonStepMap";
import { flattenStepArray } from "voice-leading/steps/flattenSteps";
import { stringifyStepReasonInfo } from "voice-leading/generators/multiple/step-reason/StepReason";

export type VoiceLeadingResult = {
    targets: Target[];
    meta: {
        multipleGenResult: MultipleGenResult;
        combinerResult: CombinerResult;
        applyCombinationsMeta: ApplyCombinationsResult["meta"];
    };
};

export function getAtomicStepsOf(
  target: Target,
  voiceLeadingResult: VoiceLeadingResult,
): Step[] {
  const combination = voiceLeadingResult.meta.applyCombinationsMeta
    .reverseMap.get(target) as Combination;
  const rawCombinations = voiceLeadingResult.meta.combinerResult.meta
    .combinationToRawsMap.get(combination)!;
  const rawCombination = rawCombinations
    .flat()
    .filter(c=>!!c);
  const { groupItemToRawsMap, reasonsMap } = voiceLeadingResult.meta.multipleGenResult.meta;
  const atomicStepsDups = rawCombination.reduce(
    (acc, s) => {
      if (s === null)
        return acc;

      const r2 = reasonsMap.get(s);

      if (r2) {
        acc.push(s);

        return acc;
      }

      const atomicCombinations = groupItemToRawsMap.get(s);

      if (!atomicCombinations) {
        acc.push(s);

        return acc;
      }

      for (const atomicCombination of atomicCombinations) {
        for (const e of atomicCombination) {
          if (e)
            acc.push(e);
        }
      }

      return acc;
    },
    [] as Step[],
  );

  return getUniqueSteps(atomicStepsDups);
}

export function humanizeVoiceLeadingResult(base: SPNArray, result: VoiceLeadingResult) {
  const { reasonsMap } = result.meta.multipleGenResult.meta;
  const unsorted = result
    .targets
    .map(t=> {
      const combination = result.meta.applyCombinationsMeta.reverseMap.get(t) as Combination;
      const atomicSteps = getAtomicStepsOf(t, result);
      const reasonsByIndex = getStepReasonsByIndex(atomicSteps, reasonsMap);
      const singleSteps = flattenStepArray(combination);
      const motions = singleSteps.reduce((acc, s) =>{
        const motion = base[s.index].toString() + " => " + t[s.index]?.toString();

        acc[motion] = reasonsByIndex[s.index]?.map(info=>stringifyStepReasonInfo(info, {
          base,
        } ))!;

        return acc;
      }, {} as Record<string, string[]>);

      return {
        chord: Chords.fromPitches(...t.map(n=>n?.pitch).filter(p=>!!p) as PitchArray)
          + " (" + t.map(String) + ")",
        motions,
      };
    } );

  return unsorted.sort((a, b)=> {
    const reasonsCountA = Object.entries(a.motions).reduce((acc, m)=> acc + m[1].length, 0);
    const reasonsCountB = Object.entries(b.motions).reduce((acc, m)=> acc + m[1].length, 0);

    return reasonsCountB - reasonsCountA;
  } );
}
