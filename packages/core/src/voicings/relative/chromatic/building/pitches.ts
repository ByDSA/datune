import type { PitchArray } from "pitches/chromatic";
import type { Voicing } from "voicings/chromatic";
import type { DegreeArray } from "chromatic";
import type { IntervalArray } from "intervals/chromatic";
import { Intervals as I } from "intervals/chromatic";
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
  const { add: Iadd, betweenNext: intervalBetweenNext, P8, P1 } = I;
  const rootIntervals: IntervalArray = [P1];

  for (let i = 1; i < pitches.length; i++) {
    let rootInterval = intervalBetweenNext(pitches[0], pitches[i]);

    while (i > 0 && rootIntervals[i - 1] >= rootInterval)
      rootInterval = Iadd(rootInterval, P8);

    rootIntervals.push(rootInterval);
  }

  return rootIntervals;
}
