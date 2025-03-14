import { Scale, Voicing, Degree, Intervals } from "@datune/core";
import { cyclicMod } from "@datune/utils";

export function findVoicings(scale: Scale, voicings: Voicing[]): Degree[][] {
  const { degrees } = scale;
  const mainDegreesArray: Degree[][] = [];

  function inner(
    indexAcc: number,
    accDegrees: Degree[],
    depth: number,
    possibleVoicings: Voicing[],
  ) {
    for (let j = 1; j < degrees.length; j++) {
      const jIndex = (indexAcc + j) % degrees.length;
      let newAccDegrees = [...accDegrees, degrees[jIndex]];
      const rootInterval = cyclicMod(Intervals.sub(degrees[jIndex], accDegrees[0]), 12);
      let newPossibleVoicings = [];

      for (const v of possibleVoicings) {
        if (v.rootIntervals[depth] === rootInterval) {
          if (v.rootIntervals.length === depth + 1)
            mainDegreesArray.push(newAccDegrees);
          else
            newPossibleVoicings.push(v);
        }
      }

      if (newPossibleVoicings.length > 0)
        inner(indexAcc + j, newAccDegrees, depth + 1, newPossibleVoicings);
    }
  }

  for (let i = 0; i < degrees.length; i++) {
    const possibleVoicings = voicings.filter(v=>v.rootIntervals[0] === Intervals.P1);

    if (possibleVoicings.length === 0)
      continue;

    inner(i, [degrees[i]], 1, voicings);
  }

  return mainDegreesArray;
}
