import { Chord, SPN } from "@datune/core";
import { Target } from "../../steps/Step";
import { targetsToChords, targetsToSpnsArray } from "../result-transforms";

export function expectTargets(targets: Target[]) {
  return {
    toEqualSpnsArray: (expected: SPN[][]) => {
      const actual = targetsToSpnsArray(targets);

      expect(new Set(actual)).toEqual(new Set(expected));
    },
    toEqualChords: (expected: Chord[]) => {
      const actual = targetsToChords(targets);

      expect(new Set(actual)).toEqual(new Set(expected));
    },
    toEqual: (expected: Target[]) => {
      expect(new Set(targets)).toEqual(new Set(expected));
    },
    toContainChord: (chord: Chord) => {
      const chords = targetsToChords(targets);

      expect(chords).toContain(chord);
    },

  };
}
