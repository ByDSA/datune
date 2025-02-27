import Chord from "../Chord";
import { Intervals, IntervalArray } from "intervals/alt";
import { PitchArray } from "pitches/alt";
import { Voicings, Voicing } from "voicings/alt";

export default function voicing(obj: Chord): Voicing | null {
  const rootIntervals: IntervalArray | null = getRootIntervalsFromNotes(obj.pitches);

  if (!rootIntervals)
    return null;

  return Voicings.fromRootIntervals(...rootIntervals);
}

function getRootIntervalsFromNotes(notes: PitchArray): IntervalArray | null {
  const { add: Iadd, betweenNext, PERFECT_OCTAVE, PERFECT_UNISON, toChromaticInterval } = Intervals;
  const rootIntervals: IntervalArray = [PERFECT_UNISON];

  for (let i = 1; i < notes.length; i++) {
    let rootInterval = betweenNext(notes[0], notes[i]);

    if (!rootInterval)
      return null;

    while (i > 0
      && toChromaticInterval(rootIntervals[i - 1]) >= toChromaticInterval(rootInterval)) {
      rootInterval = Iadd(rootInterval, PERFECT_OCTAVE);

      if (!rootInterval)
        return null;
    }

    rootIntervals.push(rootInterval);
  }

  return rootIntervals;
}
