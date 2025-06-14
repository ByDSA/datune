import type { Chord } from "chords/alt";
import type { IntervalSet } from "sets/interval-sets/alt";
import { IntervalSets as IS } from "..";

export function fromRootChord(obj: Chord): IntervalSet {
  return IS.fromRootIntervals(...obj.rootIntervals);
}
