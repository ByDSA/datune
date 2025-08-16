import type { Chord } from "@datune/core/alt";
import type { Chord as CChord } from "@datune/core/chromatic";
import { fifthLevelFromChord } from "../basic-space-chromatic";
import { getNChordalCircleOfFifthsRule } from "./chordal-circle-of-fifths-rule";

type Props = {
  x: Chord;
  y: Chord;
};
type Ret = {
  dist: number;
  meta: {
    j: number;
    k: number;
  };
};
export function chordDistanceRule( { x, y }: Props): Ret {
  const j = calcJ( {
    x,
    y,
  } );
  const k = calcK(x.toChromaticChord(), y.toChromaticChord());

  return {
    dist: j + k,
    meta: {
      j,
      k,
    },
  };
}

export function calcJ( { x, y }: Props): number {
  const n = getNChordalCircleOfFifthsRule( {
    from: x,
    to: y,
  } );

  return Math.abs(n);
}

export const calcK = countDiffsLevelsAToC;

export function countDiffsLevelsAToC(x: CChord, y: CChord): number {
  let count = 0;

  // Level a:
  if (x.root !== y.root)
    count++;

  // Level b:
  const xFifthLevel = fifthLevelFromChord(x);
  const yFifthLevel = fifthLevelFromChord(y);

  for (const p of yFifthLevel) {
    if (!xFifthLevel.has(p))
      count++;
  }

  // Level c:
  const xChordLevel = x.pitchSet;
  const yChordLevel = y.pitchSet;

  for (const p of yChordLevel) {
    if (!xChordLevel.has(p))
      count++;
  }

  return count;
}
