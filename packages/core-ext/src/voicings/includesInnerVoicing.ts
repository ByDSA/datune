import type { Voicing } from "@datune/core";
import type { InnerVoicingResult } from "./findInnerVoicings";
import { NonEmptyNumberArray } from "datils";

export function voicingIncludesInnerVoicing(
  base: Voicing,
  innerVoicing: Voicing,
): InnerVoicingResult[] {
  const results: InnerVoicingResult[] = [];
  const baseRootIntervals = base.rootIntervals;

  // eslint-disable-next-line no-restricted-syntax
  baseFor: for (const intervalInBase of base) {
    const indexMap = [] as unknown as NonEmptyNumberArray;

    for (const interval of innerVoicing) {
      const shiftedInterval = intervalInBase + interval;
      const index = baseRootIntervals.indexOf(shiftedInterval);

      if (index === -1)
        continue baseFor;

      indexMap.push(index);
    }

    results.push( {
      indexMap,
      innerVoicing,
    } );
  }

  return results;
}
