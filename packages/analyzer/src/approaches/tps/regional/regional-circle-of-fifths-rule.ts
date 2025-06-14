import { Intervals as I, Pitch, PitchSet } from "@datune/core";

export function regionalCircleOfFifthsRule(
  diatonicLevel: readonly Pitch[],
  n: number = 1,
): Pitch[] {
  const interval = (I.P5 * n) % 12;

  return diatonicLevel.map(p=>p.withShifted(interval));
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
