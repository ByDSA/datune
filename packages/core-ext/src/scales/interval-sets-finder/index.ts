import { Scale, IntervalSet, Degree, Intervals } from "@datune/core";
import { cyclicMod } from "datils/math";

export function findIntervalSets(scale: Scale, intervalSets: IntervalSet[]): Degree[][] {
  const { degrees } = scale;
  const mainDegreesArray: Degree[][] = [];

  function inner(
    indexAcc: number,
    accDegrees: Degree[],
    depth: number,
    possibleIntervalSets: IntervalSet[],
  ) {
    for (let j = 1; j < degrees.length; j++) {
      const jIndex = (indexAcc + j) % degrees.length;
      let newAccDegrees = [...accDegrees, degrees[jIndex]];
      const rootInterval = cyclicMod(Intervals.shiftDown(degrees[jIndex], accDegrees[0]), 12);
      let newPossibleIntervalSets = [];

      for (const v of possibleIntervalSets) {
        if (v.rootIntervals[depth] === rootInterval) {
          if (v.rootIntervals.length === depth + 1)
            mainDegreesArray.push(newAccDegrees);
          else
            newPossibleIntervalSets.push(v);
        }
      }

      if (newPossibleIntervalSets.length > 0)
        inner(indexAcc + j, newAccDegrees, depth + 1, newPossibleIntervalSets);
    }
  }

  for (let i = 0; i < degrees.length; i++) {
    const possibleIntervalSets = intervalSets.filter(v=>v.rootIntervals[0] === Intervals.P1);

    if (possibleIntervalSets.length === 0)
      continue;

    inner(i, [degrees[i]], 1, intervalSets);
  }

  return mainDegreesArray;
}
