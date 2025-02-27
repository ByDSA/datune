import { Intervals, Interval } from "intervals/alt";
import { Intervals as DIntervals, Interval as DiatonicInterval } from "intervals/diatonic";
import Degree from "../Degree";
import toChromaticDegree from "./chromaticDegree";

export default function toInterval(obj: Degree): Interval {
  const chromaticDegree = toChromaticDegree(obj);
  const diatonicInterval: DiatonicInterval = DIntervals.fromInt(+obj.diatonicDegree);

  return Intervals.fromIntervals( {
    chromaticInterval: chromaticDegree,
    diatonicInterval,
  } ) as Interval;
}
