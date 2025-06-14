import type { IntervalSet } from "@datune/core";
import type { InnerIntervalSetResult } from "./findInnerIntervalSets";
import { NonEmptyNumberArray } from "datils";

export function intervalSetIncludesInnerIntervalSet(
  base: IntervalSet,
  innerIntervalSet: IntervalSet,
): InnerIntervalSetResult[] {
  const results: InnerIntervalSetResult[] = [];
  const baseRootIntervals = base.rootIntervals;

  // eslint-disable-next-line no-restricted-syntax
  baseFor: for (const intervalInBase of base) {
    const indexMap = [] as unknown as NonEmptyNumberArray;

    for (const interval of innerIntervalSet) {
      const shiftedInterval = intervalInBase + interval;
      const index = baseRootIntervals.indexOf(shiftedInterval);

      if (index === -1)
        continue baseFor;

      indexMap.push(index);
    }

    results.push( {
      indexMap,
      innerIntervalSet,
    } );
  }

  return results;
}
