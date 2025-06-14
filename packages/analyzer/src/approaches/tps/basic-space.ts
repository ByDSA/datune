import { Intervals as I, Pitch, Chord, Pitches, Key, PitchSet, PitchSets as PS } from "@datune/core/alt";

export type BasicSpaceLevels = {
  octave: Pitch;
  fifth: PitchSet;
  triad: PitchSet;
  diatonic: PitchSet;
  chromatic: PitchSet;
};

type BasicSpaceFromProps = {
  key: Key;
  chord: Chord;
};
export function fromKeyChord(props: BasicSpaceFromProps): BasicSpaceLevels {
  const { octave, fifth, triad } = levelsAToCFromChord(props.chord);
  const diatonic = PS.fromPitches(...props.key.pitches);

  return {
    octave,
    fifth,
    triad,
    diatonic,
    chromatic: PS.fromPitches(...Pitches.ALL),
  };
}

type BasicSpaceLevelsAToC = Pick<BasicSpaceLevels, "fifth" | "octave" | "triad">;
export function levelsAToCFromChord(chord: Chord): BasicSpaceLevelsAToC {
  const octave = chord.root;
  const fifth = fifthLevelFromChord(chord);
  const triad = PS.fromPitches(...chord.pitches);

  return {
    octave,
    fifth,
    triad,
  };
}

export function fifthLevelFromChord(chord: Chord): PitchSet {
  let firstPitchFromRoot = chord.root;

  if (!chord.has(firstPitchFromRoot)) {
    const cPitches = chord.pitchSet.toChromaticPitchSet();
    const cFirstPitchFromRoot = firstPitchFromRoot.toChromatic();

    for (let i = 0; i < 12; i++) {
      const p = cFirstPitchFromRoot.withShifted(i);

      if (cPitches.has(p)) {
        firstPitchFromRoot = chord.pitches.find(ap => ap.toChromatic() === p)!;
        break;
      }
    }
  }

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

export const getPitchFourth = (root: Pitch, c: PitchSet): Pitch => {
  const P4 = root.withShifted(I.P4);

  if (c.has(P4) || !c.has(root))
    return P4;

  const a4 = root.withShifted(I.d5);

  if (c.has(a4))
    return a4;

  return P4;
};
