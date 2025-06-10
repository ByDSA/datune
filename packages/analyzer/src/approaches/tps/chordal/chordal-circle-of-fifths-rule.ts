import { Chord, PitchSets as PS, Chords as C, Pitch, PitchSet } from "@datune/core/alt";
import { Pitches as DP, type Pitch as DPitch } from "@datune/core/diatonic";
import { Intervals as CI } from "@datune/core";

type Props = {
  chord: Chord;
  diatonicLevel: PitchSet;
  n?: number;
};
export function chordalCircleOfFifthsRule( { chord,
  diatonicLevel,
  n = 1 }: Props): Chord {
  const bassIndexInChord = chord.pitches.indexOf(chord.bass);
  let newPitches: Pitch[] = [...chord.pitches];
  let newRoot = chord.root;
  // classify diatonicLevel by diatonic:
  const diatonicClassified = classifyByDiatonic(diatonicLevel);
  let { diatonic } = chord.root;

  if (n > 0) {
    for (let i = 0; i < n; i++) {
      diatonic = DIATONIC_CIRCLE_OF_FIFTHS_STEP.get(diatonic)!;

      const altPitchesWithDiatonic = diatonicClassified.get(diatonic);

      if (altPitchesWithDiatonic === undefined || altPitchesWithDiatonic.length === 0)
        throw new Error(`Diatonic pitch ${diatonic} not found in diatonic level.`);

      if (altPitchesWithDiatonic.length === 1)
        [newRoot] = altPitchesWithDiatonic;
      else {
        const chromaticDistances: Record<number, Pitch> = altPitchesWithDiatonic
          .reduce((acc, p) => {
            const distance = CI.betweenNext(newRoot.toChromatic(), p.toChromatic());

            acc[distance] = p;

            return acc;
          }, {} as Record<number, Pitch>);

        newRoot = chromaticDistances[CI.P5]
        ?? chromaticDistances[CI.d5]
        ?? altPitchesWithDiatonic[0];
      }
    }
  } else {
    for (let i = 0; i > n; i--) {
      diatonic = DIATONIC_CIRCLE_OF_FIFTHS_REVERSE_STEP.get(diatonic)!;

      const altPitchesWithDiatonic = diatonicClassified.get(diatonic);

      if (altPitchesWithDiatonic === undefined || altPitchesWithDiatonic.length === 0)
        throw new Error(`Diatonic pitch ${diatonic} not found in diatonic level.`);

      if (altPitchesWithDiatonic.length === 1)
        [newRoot] = altPitchesWithDiatonic;
      else {
        const chromaticDistances: Record<number, Pitch> = altPitchesWithDiatonic
          .reduce((acc, p) => {
            const distance = CI.betweenNext(newRoot.toChromatic(), p.toChromatic());

            acc[distance] = p;

            return acc;
          }, {} as Record<number, Pitch>);

        newRoot = chromaticDistances[CI.P4]
        ?? chromaticDistances[CI.d5]
        ?? altPitchesWithDiatonic[0];
      }
    }
  }

  const newBass = newPitches[bassIndexInChord];

  return C.from( {
    root: newRoot,
    bass: newBass,
    pitchSet: PS.fromPitches(...newPitches),
  } );
}

function classifyByDiatonic(pitches: PitchSet): Map<DPitch, Pitch[]> {
  const classified = new Map<DPitch, Pitch[]>();

  for (const p of pitches) {
    const diatonicPitch = p.diatonic;
    let arr = classified.get(diatonicPitch);

    if (arr === undefined) {
      arr = [];
      classified.set(diatonicPitch, arr);
    }

    arr.push(p);
  }

  return classified;
}

const DIATONIC_CIRCLE_OF_FIFTHS: DPitch[] = [DP.C, DP.G, DP.D, DP.A, DP.E, DP.B, DP.F];
const DIATONIC_CIRCLE_OF_FIFTHS_INDEX: ReadonlyMap<DPitch, number> = new Map(
  DIATONIC_CIRCLE_OF_FIFTHS.map((p, i) => [p, i]),
);
const DIATONIC_CIRCLE_OF_FIFTHS_STEP: ReadonlyMap<DPitch, DPitch> = new Map([
  [DP.C, DP.G],
  [DP.G, DP.D],
  [DP.D, DP.A],
  [DP.A, DP.E],
  [DP.E, DP.B],
  [DP.B, DP.F],
  [DP.F, DP.C],
]);
const DIATONIC_CIRCLE_OF_FIFTHS_REVERSE_STEP: ReadonlyMap<DPitch, DPitch> = new Map([
  [DP.C, DP.F],
  [DP.F, DP.B],
  [DP.B, DP.E],
  [DP.E, DP.A],
  [DP.A, DP.D],
  [DP.D, DP.G],
  [DP.G, DP.C],
]);

type nProps = {
from: Chord;
to: Chord;
};
export function getNChordalCircleOfFifthsRule( { from, to }: nProps): number {
  const fromDiatonic = from.root.diatonic;
  const toDiatonic = to.root.diatonic;
  const fromIndex = DIATONIC_CIRCLE_OF_FIFTHS_INDEX.get(fromDiatonic)!;
  const toIndex = DIATONIC_CIRCLE_OF_FIFTHS_INDEX.get(toDiatonic)!;
  let distance = toIndex - fromIndex;

  // Ajustamos para que esté entre -3 y +3
  if (distance > 3)
    distance -= 7;

  if (distance < -3)
    distance += 7;

  return distance;
}
