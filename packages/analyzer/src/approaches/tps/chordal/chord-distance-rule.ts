import type { Chord } from "@datune/core/alt";
import type { Chord as CChord } from "@datune/core/chromatic";
import { fifthLevelFromChord } from "../basic-space-chromatic";
import { getNChordalCircleOfFifthsRule } from "./chordal-circle-of-fifths-rule";

type JProps = {
  from: Chord;
  to: Chord;
};
export function calcJ( { from, to }: JProps): number {
  return Math.abs(getNChordalCircleOfFifthsRule( {
    from,
    to,
  } ));
}

type ChordDistanceRuleProps = {
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
export function chordDistanceRule( { x, y }: ChordDistanceRuleProps): Ret {
  const j = calcJ( {
    from: x,
    to: y,
  } );
  const k = calcK(x.toChromatic(), y.toChromatic());

  return {
    dist: j + k,
    meta: {
      j,
      k,
    },
  };
}

export const calcK = distinctivePitchClassesInBasicSpaceLevelsAToC;

export function distinctivePitchClassesInBasicSpaceLevelsAToC(x: CChord, y: CChord): number {
  const xSet = x.pitchSet;
  const ySet = y.pitchSet;
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
  for (const p of ySet) {
    if (!xSet.has(p))
      count++;
  }

  return count;
}
