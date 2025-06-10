import { Intervals as I, Pitch, Chord, PitchSet, PitchSets as PS } from "@datune/core/chromatic";

export type BasicSpaceLevels = {
  octave: Pitch;
  fifth: PitchSet;
  triad: PitchSet;
  diatonic: PitchSet;
  chromatic: PitchSet;
};

export function fifthLevelFromChord(chord: Chord): BasicSpaceLevels["fifth"] {
  let firstPitchFromRoot = chord.root;

  return PS.fromPitches(firstPitchFromRoot, getPitchFifth(firstPitchFromRoot, chord.pitchSet));
}

export const getPitchFifth = (root: Pitch, c: PitchSet): Pitch => {
  const P5 = root.withShifted(I.P5);

  if (c.has(P5) || !c.has(root))
    return P5;

  const d5 = root.withShifted(I.d5);

  if (c.has(d5))
    return d5;

  return P5;
};
