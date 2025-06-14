import { IntervalSets as IS } from "sets/interval-sets/chromatic";
import { Chord, Chords } from "chords/chromatic";
import { Key } from "../Key";

export function triadRootChord(obj: Key): Chord | null {
  const { inv, TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = IS;
  const intervalSetPriority = [
    TRIAD_MAJOR,
    TRIAD_MINOR,
    TRIAD_DIMINISHED,
    TRIAD_AUGMENTED,
  ];

  for (let i = 0; i < 3; i++) {
    for (const intervalSet of intervalSetPriority) {
      let intervalSetInv = intervalSet;

      if (i > 0)
        intervalSetInv = inv(intervalSetInv, i);

      const chord = Chords.fromRootIntervalSet(obj.root, intervalSetInv);

      if (obj.hasChord(chord))
        return chord;
    }
  }

  return null;
}
