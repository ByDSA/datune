import { Degrees as D } from "@datune/core";
import { Degree } from "@datune/core/degrees/chromatic";
import { DegreeFunc } from "@datune/core/functions/chromatic/degree-function/DegreeFunc";
import { Funcs as F, MusicalDuration } from "@datune/core";

export const commonDegreesWith = (
  degreeFunc: DegreeFunc,
  withDegrees: Degree[],
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
  D.I,
  D.bIII,
  D.III,
  D.V,
]);

export const isSubDominant = (
  degreeFunc: DegreeFunc,
): boolean => commonDegreesWith(degreeFunc, [
  D.IV,
  D.bVI,
  D.VI,
  D.I,
]);

export const isDominant = (
  degreeFunc: DegreeFunc,
): boolean => commonDegreesWith(degreeFunc, [
  D.V,
  D.VII,
  D.bVII,
  D.II,
]);

export function limitTime(m: MusicalDuration, limit: MusicalDuration): MusicalDuration {
  return (Math.min(m, limit));
}
