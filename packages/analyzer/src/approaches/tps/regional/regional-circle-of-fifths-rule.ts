import { Intervals as I, PitchSet, type Pitch } from "@datune/core";
import { PitchSets as PS } from "@datune/core";

export function regionalCircleOfFifthsRule(
  diatonicLevel: Readonly<Iterable<Pitch>>,
  n: number = 1,
): PitchSet {
  const interval = (I.P5 * n) % 12;
  let pitchSetBase: PitchSet;

  if (diatonicLevel instanceof PitchSet)
    pitchSetBase = diatonicLevel;
  else {
    let set;

    if (diatonicLevel instanceof Set)
      set = diatonicLevel;
    else
      set = new Set(diatonicLevel);

    pitchSetBase = PS.from(set);
  }

  return pitchSetBase.withShifted(interval);
}

type nProps = {
from: PitchSet;
to: PitchSet;
};
export function getNRegionalCircleOfFifthsRule( { from, to }: nProps): number {
  if (from === to)
    return 0;

  let left = from;
  let right = from;

  for (let i = 1; i <= 6; i++) {
    right = right.withShifted(I.P5);

    if (right === to)
      return i;

    left = left.withShiftedDown(I.P5);

    if (left === to)
      return -i;
  }

  throw new Error(`Cannot find the interval between ${from} and ${to}.`);
}
