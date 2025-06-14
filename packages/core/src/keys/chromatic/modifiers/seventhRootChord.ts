import type { Key } from "../Key";
import { IntervalSets as IS } from "sets/interval-sets/chromatic";
import { type Chord, Chords as C } from "chords/chromatic";

export function seventhRootChord(obj: Key): Chord | null {
  const chordRootIntervalSetPriority = [
    IS.fromRootIntervals(0, 4, 7, 11), // Maj7
    IS.fromRootIntervals(0, 3, 7, 11), // mMaj7
    IS.fromRootIntervals(0, 4, 7, 10), // 7
    IS.fromRootIntervals(0, 3, 7, 10), // m7
    IS.fromRootIntervals(0, 3, 6, 10), // m7b5
    IS.fromRootIntervals(0, 3, 6, 11),
    IS.fromRootIntervals(0, 4, 8, 10),
    IS.fromRootIntervals(0, 4, 8, 11),
  ];
  let ret = null;

  for (const intervalSet of chordRootIntervalSetPriority) {
    if (!intervalSet)
      continue;

    const chord = C.fromRootIntervalSet(obj.root, intervalSet);

    if (obj.hasChord(chord)) {
      ret = chord;
      break;
    }
  }

  return ret;
}
