import type { Degree } from "../Degree";
import type { Interval } from "intervals/alt";
import { Degrees } from "degrees/diatonic";
import { Intervals } from "intervals/alt";
import { calcAlts } from "pitches/alt/calcAlts";
import { toChromaticDegree } from "../conversions/chromaticDegree";
import { from } from "../building";

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
