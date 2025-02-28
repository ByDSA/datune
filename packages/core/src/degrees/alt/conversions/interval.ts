import type { Degree } from "../Degree";
import { toChromaticDegree } from "./chromaticDegree";
import type { Interval } from "intervals/alt";
import { Intervals } from "intervals/alt";
import { Intervals as DIntervals, Interval as DiatonicInterval } from "intervals/diatonic";

export function toInterval(obj: Degree): Interval {
  const chromaticDegree = toChromaticDegree(obj);
  const diatonicInterval: DiatonicInterval = DIntervals.fromInt(+obj.diatonicDegree);

  return Intervals.fromIntervals( {
    chromaticInterval: chromaticDegree,
    diatonicInterval,
  } ) as Interval;
}
