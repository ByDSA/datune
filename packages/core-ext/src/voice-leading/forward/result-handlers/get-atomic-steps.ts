import type { Combination } from "voice-leading/combiners/types";
import type { Step } from "voice-leading/steps";
import type { Target } from "voice-leading/steps/Target";
import type { VoiceLeadingResult } from "../Result";
import { getUniqueSteps } from "voice-leading/steps/id";

export function getAtomicStepsOf(
  target: Target,
  result: VoiceLeadingResult,
): Step[] {
  const combination = result.meta.applyCombinationsMeta
    .reverseMap.get(target) as Combination;
  const rawCombinations = result.meta.combinerResult.meta
    .combinationToRawsMap.get(combination)!;
  const rawCombination = rawCombinations
    .flat()
    .filter(c=>!!c);
  const { groupItemToRawsMap, reasonsMap } = result.meta.multipleGenResult.meta;
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
