import type { Chord } from "chords/alt";
import type { IntervalArray } from "intervals/alt";
import type { PitchArray } from "pitches/alt";
import type { Voicing } from "voicings/alt";
import { Intervals as I } from "intervals/alt";
import { Intervals as CI } from "intervals/chromatic";
import { Voicings as V } from "..";

export function fromChord(obj: Chord): Voicing {
  const rootIntervals: IntervalArray = getRootIntervalsFromNotes(obj.pitches);

  return V.fromRootIntervals(...rootIntervals);
}

function getRootIntervalsFromNotes(notes: PitchArray): IntervalArray {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { add: Iadd, betweenNext, P8, P1 } = I;
  const { fromAltInterval } = CI;
  const rootIntervals: IntervalArray = [P1];

  for (let i = 1; i < notes.length; i++) {
    let rootInterval = betweenNext(notes[0], notes[i]);

    while (i > 0
      && fromAltInterval(rootIntervals[i - 1]) >= fromAltInterval(rootInterval))
      rootInterval = Iadd(rootInterval, P8);

    rootIntervals.push(rootInterval);
  }

  return rootIntervals;
}
