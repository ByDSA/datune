import { fromIntervals as DAIFromIntervals, Interval } from "intervals/alt";
import { fromInt as intervalDiatonicFromInt, Interval as DiatonicInterval } from "intervals/diatonic";
import Degree from "../Degree";
import toChromaticDegree from "./chromaticDegree";

export default function toInterval(obj: Degree): Interval {
  const chromaticDegree = toChromaticDegree(obj);
  const diatonicInterval: DiatonicInterval = intervalDiatonicFromInt(+obj.diatonicDegree);

  return DAIFromIntervals( {
    chromaticInterval: chromaticDegree,
    diatonicInterval,
  } ) as Interval;
}
