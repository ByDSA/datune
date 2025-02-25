import { add as Iadd, Array as IntervalArray, betweenNext as intervalBetweenNext, PERFECT_OCTAVE, PERFECT_UNISON } from "intervals/chromatic";
import { Array as PitchArray } from "pitches/chromatic";
import { Voicing } from "voicings/chromatic";
import fromRootIntervals from "./rootIntervals";

export default function fromPitches(...pitches: PitchArray): Voicing {
  const rootIntervals: IntervalArray = getRootIntervalsFromNotes(pitches);

  return fromRootIntervals(...rootIntervals);
}

function getRootIntervalsFromNotes(notes: PitchArray): IntervalArray {
  const rootIntervals: IntervalArray = [PERFECT_UNISON];

  for (let i = 1; i < notes.length; i++) {
    let rootInterval = intervalBetweenNext(notes[0], notes[i]);

    while (i > 0 && rootIntervals[i - 1] >= rootInterval)
      rootInterval = Iadd(rootInterval, PERFECT_OCTAVE);

    rootIntervals.push(rootInterval);
  }

  return rootIntervals;
}
