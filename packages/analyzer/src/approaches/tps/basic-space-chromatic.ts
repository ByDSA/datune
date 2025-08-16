import { Intervals as I, Pitch, Chord, PitchSet, PitchSets as PS } from "@datune/core/chromatic";

export type BasicSpace = {
  octave: Pitch;
  fifth: PitchSet;
  triad: PitchSet;
  diatonic: PitchSet;
  chromatic: PitchSet;
};

export function fifthLevelFromChord(chord: Chord): BasicSpace["fifth"] {
  const firstPitchFromRoot = getFirstPitchFromRoot(chord);

  return PS.fromPitches(firstPitchFromRoot, getPitchFifth(firstPitchFromRoot, chord.pitchSet));
}

function getFirstPitchFromRoot(chord: Chord): Pitch {
  let firstPitchFromRoot = chord.root;

  if (!chord.has(firstPitchFromRoot)) {
    const cPitchSet = chord.pitchSet;

    for (let i = 0; i < 12; i++) {
      const p = firstPitchFromRoot.withShifted(i);

      if (cPitchSet.has(p)) {
        firstPitchFromRoot = chord.pitches.find(ap => ap === p)!;
        break;
      }
    }
  }

  return firstPitchFromRoot;
}

const getPitchFifth = (root: Pitch, c: PitchSet): Pitch => {
  const P5 = root.withShifted(I.P5);

  if (c.has(P5) || !c.has(root))
    return P5;

  const d5 = root.withShifted(I.d5);

  if (c.has(d5))
    return d5;

  return P5;
};
