import type { PitchArray } from "pitches/chromatic";
import type { Voicing } from "voicings/chromatic";
import { IntervalArray, Intervals } from "intervals/chromatic";
import { fromRootIntervals } from "./rootIntervals";

export function fromPitches(...pitches: PitchArray): Voicing {
  const rootIntervals: IntervalArray = getRootIntervalsFromNotes(pitches);

  return fromRootIntervals(...rootIntervals);
}

function getRootIntervalsFromNotes(notes: PitchArray): IntervalArray {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { add: Iadd, betweenNext: intervalBetweenNext, P8, P1 } = Intervals;
  const rootIntervals: IntervalArray = [P1];

  for (let i = 1; i < notes.length; i++) {
    let rootInterval = intervalBetweenNext(notes[0], notes[i]);

    while (i > 0 && rootIntervals[i - 1] >= rootInterval)
      rootInterval = Iadd(rootInterval, P8);

    rootIntervals.push(rootInterval);
  }

  return rootIntervals;
}
