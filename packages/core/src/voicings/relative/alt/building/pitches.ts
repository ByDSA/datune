import type { PitchArray } from "pitches/alt";
import type { Voicing } from "voicings/alt";
import { IntervalArray, Intervals } from "intervals/alt";
import { DegreeArray } from "alt";
import { fromRootIntervals } from "./rootIntervals";

export function fromPitches(...pitches: PitchArray): Voicing {
  const rootIntervals: IntervalArray = getRootIntervalsFromPitches(pitches);

  return fromRootIntervals(...rootIntervals);
}

export function fromDegrees(...degrees: DegreeArray): Voicing {
  const rootIntervals: IntervalArray = getRootIntervalsFromDegrees(degrees);

  return fromRootIntervals(...rootIntervals);
}

function getRootIntervalsFromDegrees(degrees: DegreeArray): IntervalArray {
  return getRootIntervalsFromPitches(degrees as any);
}

function getRootIntervalsFromPitches(pitches: PitchArray): IntervalArray {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { add: Iadd, betweenNext: intervalBetweenNext, P8, P1 } = Intervals;
  const rootIntervals: IntervalArray = [P1];

  for (let i = 1; i < pitches.length; i++) {
    let rootInterval = intervalBetweenNext(pitches[0], pitches[i]);

    if (!rootInterval)
      throw new Error();

    while (i > 0 && rootIntervals[i - 1].diatonicInterval >= rootInterval.diatonicInterval) {
      rootInterval = Iadd(rootInterval, P8);

      if (!rootInterval)
        throw new Error();
    }

    rootIntervals.push(rootInterval);
  }

  return rootIntervals;
}
