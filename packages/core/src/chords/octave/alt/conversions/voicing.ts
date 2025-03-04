import type { Chord } from "../Chord";
import type { IntervalArray } from "intervals/alt";
import type { PitchArray } from "pitches/alt";
import type { Voicing } from "voicings/alt";
import { Intervals } from "intervals/alt";
import { Voicings } from "voicings/alt";

export function toVoicing(obj: Chord): Voicing | null {
  const rootIntervals: IntervalArray | null = getRootIntervalsFromNotes(obj.pitches);

  if (!rootIntervals)
    return null;

  return Voicings.fromRootIntervals(...rootIntervals);
}

function getRootIntervalsFromNotes(notes: PitchArray): IntervalArray | null {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { add: Iadd, betweenNext, P8, P1, toChromaticInterval } = Intervals;
  const rootIntervals: IntervalArray = [P1];

  for (let i = 1; i < notes.length; i++) {
    let rootInterval = betweenNext(notes[0], notes[i]);

    if (!rootInterval)
      return null;

    while (i > 0
      && toChromaticInterval(rootIntervals[i - 1]) >= toChromaticInterval(rootInterval)) {
      rootInterval = Iadd(rootInterval, P8);

      if (!rootInterval)
        return null;
    }

    rootIntervals.push(rootInterval);
  }

  return rootIntervals;
}
