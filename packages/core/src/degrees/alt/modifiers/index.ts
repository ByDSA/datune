import { from } from "../building";
import { toChromaticDegree } from "../conversions/chromaticDegree";
import type { Degree } from "../Degree";
import { Degrees } from "degrees/diatonic";
import type { Interval } from "intervals/alt";
import { Intervals } from "intervals/alt";
import { calcAlts } from "pitches/alt/calcAlts";

export function add(obj: Degree, interval: Interval): Degree {
  const chromaticDegreeSum = toChromaticDegree(obj) + Intervals.toChromaticInterval(interval);
  const diatonicDegreeInt = +obj.diatonicDegree + +interval.diatonicInterval;
  const diatonicDegree = Degrees.fromInt(diatonicDegreeInt);
  const alts = calcAlts(chromaticDegreeSum, diatonicDegree);

  return from(diatonicDegree, alts);
}

export function sub(obj: Degree, interval: Interval): Degree {
  const chromaticDegreeSum = toChromaticDegree(obj) - Intervals.toChromaticInterval(interval);
  const diatonicDegreeInt = +obj.diatonicDegree - +interval.diatonicInterval;
  const diatonicDegree = Degrees.fromInt(diatonicDegreeInt);
  const alts = calcAlts(chromaticDegreeSum, diatonicDegree);

  return from(diatonicDegree, alts);
}
