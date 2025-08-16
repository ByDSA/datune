import type { ChordKey } from "./ChordKey";
import { Intervals as I, Pitch, type Chord, Pitches, type PitchSet, PitchSets as PS } from "@datune/core/alt";

export type BasicSpace = {
  octave: Pitch;
  fifth: PitchSet;
  triad: PitchSet;
  diatonic: PitchSet;
  chromatic: PitchSet;
};

export function fromChordKey(props: ChordKey): BasicSpace {
  const { octave, fifth, triad } = levelsAToCFromChord(props.chord);
  const diatonic = props.key.pitchSet;

  return {
    octave,
    fifth,
    triad,
    diatonic,
    chromatic: PS.fromPitches(...Pitches.ALL),
  };
}

type BasicSpaceLevelsAToC = Pick<BasicSpace, "fifth" | "octave" | "triad">;
function levelsAToCFromChord(chord: Chord): BasicSpaceLevelsAToC {
  const octave = chord.root;
  const fifth = fifthLevelFromChord(chord);
  const triad = chord.pitchSet;

  return {
    octave,
    fifth,
    triad,
  };
}

export function fifthLevelFromChord(chord: Chord): BasicSpace["fifth"] {
  let firstPitchFromRoot = getFirstPitchFromRoot(chord);

  return PS.fromPitches(firstPitchFromRoot, getPitchFifth(firstPitchFromRoot, chord.pitchSet));
}

function getFirstPitchFromRoot(chord: Chord): Pitch {
  let firstPitchFromRoot = chord.root;

  if (!chord.has(firstPitchFromRoot)) {
    const cPitchSet = chord.pitchSet.toChromaticPitchSet();
    const cFirstPitchFromRoot = firstPitchFromRoot.toChromatic();

    for (let i = 0; i < 12; i++) {
      const p = cFirstPitchFromRoot.withShifted(i);

      if (cPitchSet.has(p)) {
        firstPitchFromRoot = chord.pitches.find(ap => ap.toChromatic() === p)!;
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
