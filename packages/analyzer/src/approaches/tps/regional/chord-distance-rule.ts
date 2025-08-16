import type { ChordKey } from "../ChordKey";
import { calcJ as calcJInChordal, countDiffsLevelsAToC } from "../chordal/chord-distance-rule";
import { getNRegionalCircleOfFifthsRule } from "./regional-circle-of-fifths-rule";

type Props = {
  x: ChordKey;
  y: ChordKey;
};
type Ret = {
  dist: number;
  meta: {
    i: number;
    j: number;
    k: number;
  };
};
export function regionalLevelChordDistanceRule(props: Props): Ret {
  const i = calcI(props);
  const j = calcJ(props);
  const k = calcK(props);
  const dist = i + j + k;

  return {
    dist,
    meta: {
      i,
      j,
      k,
    },
  };
}

export function calcI( { x, y }: Props): number {
  if (x.key === y.key)
    return 0;

  const xPitchSet = x.key.pitchSet;
  const yPitchSet = y.key.pitchSet;
  const n = getNRegionalCircleOfFifthsRule( {
    from: xPitchSet.toChromaticPitchSet(),
    to: yPitchSet.toChromaticPitchSet(),
  } );

  return Math.abs(n);
}

export function calcJ( { x, y }: Props): number {
  return calcJInChordal( {
    x: x.chord,
    y: y.chord,
  } );
}

export const calcK = countDiffsLevelsAToD;

export function countDiffsLevelsAToD(
  { x, y }: Props,
): number {
  let count = countDiffsLevelsAToC(
    x.chord.toChromaticChord(),
    y.chord.toChromaticChord(),
  );
  // Level d:
  const yDiatonicLevel = y.key.pitchSet
    .withAdded(...y.chord.pitches);
  const xDiatonicLevel = x.key.pitchSet;

  for (const p of yDiatonicLevel) {
    if (!xDiatonicLevel.has(p))
      count++;
  }

  return count;
}
