import { fromRootIntervals } from "./rootIntervals";
import { IntervalArray, Intervals } from "intervals/chromatic";
import { PitchArray } from "pitches/chromatic";
import { Voicing } from "voicings/chromatic";

export function fromPitches(...pitches: PitchArray): Voicing {
  const rootIntervals: IntervalArray = getRootIntervalsFromNotes(pitches);

  return fromRootIntervals(...rootIntervals);
}

function getRootIntervalsFromNotes(notes: PitchArray): IntervalArray {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { add: Iadd, betweenNext: intervalBetweenNext, PERFECT_OCTAVE, PERFECT_UNISON } = Intervals;
  const rootIntervals: IntervalArray = [PERFECT_UNISON];

  for (let i = 1; i < notes.length; i++) {
    let rootInterval = intervalBetweenNext(notes[0], notes[i]);

    while (i > 0 && rootIntervals[i - 1] >= rootInterval)
      rootInterval = Iadd(rootInterval, PERFECT_OCTAVE);

    rootIntervals.push(rootInterval);
  }

  return rootIntervals;
}
