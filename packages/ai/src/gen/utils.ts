import { bIII, bVI, bVII, I, II, III, IV, V, VI, VII } from "@datune/core/degrees/chromatic/constants";
import { Degree as DegreeAlt } from "@datune/core/degrees/chromatic";
import { DegreeFunc } from "@datune/core/functions/chromatic/degree-function/DegreeFunc";
import { Funcs as F, MusicalDuration } from "@datune/core";

export const commonDegreesWith = (
  degreeFunc: DegreeFunc,
  withDegrees: DegreeAlt[],
): boolean => {
  let common = 0;

  for (const d of F.getDegrees(degreeFunc)) {
    if (withDegrees.includes(d))
      common++;
  }

  if (common >= 2)
    return true;

  return false;
};

export const isTonic = (
  degreeFunc: DegreeFunc,
): boolean => commonDegreesWith(degreeFunc, [
  I,
  bIII,
  III,
  V,
]);

export const isSubDominant = (
  degreeFunc: DegreeFunc,
): boolean => commonDegreesWith(degreeFunc, [
  IV,
  bVI,
  VI,
  I,
]);

export const isDominant = (
  degreeFunc: DegreeFunc,
): boolean => commonDegreesWith(degreeFunc, [
  V,
  VII,
  bVII,
  II,
]);

export function limitTime(m: MusicalDuration, limit: MusicalDuration): MusicalDuration {
  return (Math.min(m, limit));
}
