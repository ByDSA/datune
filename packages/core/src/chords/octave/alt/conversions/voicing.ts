import { add as Iadd, Array as IntervalArray, betweenNext, PERFECT_OCTAVE, PERFECT_UNISON, toChromaticInterval } from "intervals/alt";
import { Array as PitchArray } from "pitches/alt";
import { fromRootIntervals as voicingFromRootIntervals, Voicing } from "voicings/alt";
import Chord from "../Chord";

export default function voicing(obj: Chord): Voicing | null {
  const rootIntervals: IntervalArray | null = getRootIntervalsFromNotes(obj.pitches);

  if (!rootIntervals)
    return null;

  return voicingFromRootIntervals(...rootIntervals);
}

function getRootIntervalsFromNotes(notes: PitchArray): IntervalArray | null {
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
