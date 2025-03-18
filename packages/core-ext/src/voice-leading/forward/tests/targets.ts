import { Chord, Spn } from "@datune/core";
import { Target, targetsToSpnsArray, targetsToChords, targetGetId } from "voice-leading/steps/Target";

export function expectTargets(targets: Target[]) {
  return {
    toEqualSpnsArray: (expected: Spn[][]) => {
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
    toContainChords: (...chords: Chord[]) => {
      const targetChords = targetsToChords(targets);
      const notFound = [];

      for (const c of chords) {
        try {
          expect(targetChords).toContain(c);
        } catch {
          notFound.push(c);
        }
      }

      if (notFound.length > 0)
        throw new Error(["Not found chords:", "\n" + notFound.map(String).join("\n"), "\n\nReceived chords:", "\n" + targetChords.map(String).join("\n")].join(" "));
    },
  };
}

export function removeDuplicatedSpnArrays(spnArrays: (Spn | null)[][]): (Spn | null)[][] {
  const uniqueArrays = new Set<string>();

  return spnArrays.filter(spnArray => {
    const id = targetGetId(spnArray);

    if (uniqueArrays.has(id))
      return false;

    uniqueArrays.add(id);

    return true;
  } );
}
