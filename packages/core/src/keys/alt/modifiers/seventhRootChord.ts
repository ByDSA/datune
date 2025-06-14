import type { Chord } from "chords/alt";
import { IntervalSets, type IntervalSet } from "sets/interval-sets/alt";
import { IntervalSets as CIS } from "sets/interval-sets/chromatic";
import { IntervalSets as DIS } from "sets/interval-sets/diatonic";
import { Chords } from "chords/alt";
import { Key } from "../Key";

export function seventhRootChord(obj: Key): Chord | null {
  const { fromIntervalSets } = IntervalSets;
  const chordRootIntervalSetPriority: IntervalSet[] = [
    fromIntervalSets(CIS.fromRootIntervals(0, 4, 7, 11), DIS.SEVENTH) as IntervalSet, // Maj7
    fromIntervalSets(CIS.fromRootIntervals(0, 3, 7, 11), DIS.SEVENTH) as IntervalSet, // mMaj7
    fromIntervalSets(CIS.fromRootIntervals(0, 4, 7, 10), DIS.SEVENTH) as IntervalSet, // 7
    fromIntervalSets(CIS.fromRootIntervals(0, 3, 7, 10), DIS.SEVENTH) as IntervalSet, // m7
    fromIntervalSets(CIS.fromRootIntervals(0, 3, 6, 10), DIS.SEVENTH) as IntervalSet, // m7b5
    fromIntervalSets(CIS.fromRootIntervals(0, 3, 6, 11), DIS.SEVENTH) as IntervalSet,
    fromIntervalSets(CIS.fromRootIntervals(0, 4, 8, 10), DIS.SEVENTH) as IntervalSet,
    fromIntervalSets(CIS.fromRootIntervals(0, 4, 8, 11), DIS.SEVENTH) as IntervalSet,
  ];
  let ret = null;

  for (const intervalSet of chordRootIntervalSetPriority) {
    const chord = Chords.fromRootIntervalSet(obj.root, intervalSet);

    if (obj.hasChord(chord)) {
      ret = chord;
      break;
    }
  }

  return ret;
}
