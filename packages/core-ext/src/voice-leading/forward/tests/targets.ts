import { PitchSet, Spn } from "@datune/core";
import { Target, targetsToSpnsArray, targetsToChords, targetGetId } from "voice-leading/steps/Target";

export function expectTargets(targets: Target[]) {
  return {
    toEqualSpnsArray: (expected: Spn[][]) => {
      const actual = targetsToSpnsArray(targets);

      expect(new Set(actual)).toEqual(new Set(expected));
    },
    toEqualPitchSets: (expected: PitchSet[]) => {
      const actual = targetsToChords(targets).map(c=>c.pitchSet);
      const actualSet = new Set(actual);
      const expectedSet = new Set(expected);

      expect(actualSet).toEqual(expectedSet);
    },
    toEqual: (expected: Target[]) => {
      expect(new Set(targets)).toEqual(new Set(expected));
    },
    toContainPitchSet: (ps: PitchSet) => {
      const pitchSets = targetsToChords(targets).map(c=>c.pitchSet);

      expect(pitchSets).toContain(ps);
    },
    toContainPitchSets: (...pitchSets: PitchSet[]) => {
      const targetPitchSets = targetsToChords(targets).map(c=>c.pitchSet);
      const notFound = [];

      for (const c of pitchSets) {
        try {
          expect(targetPitchSets).toContain(c);
        } catch {
          notFound.push(c);
        }
      }

      if (notFound.length > 0)
        throw new Error(["Not found chords:", "\n" + notFound.map(String).join("\n"), "\n\nReceived chords:", "\n" + targetPitchSets.map(String).join("\n")].join(" "));
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
