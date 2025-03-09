import type { Degree } from "alt";
import type { Interval } from "intervals/alt";
import { fromAltDegree } from "degrees/chromatic/building/fromAltDegree";
import { Intervals as DI, Interval as DInterval } from "intervals/diatonic";
import { fromIntervals } from "./intervals";

export function fromDegree(degree: Degree): Interval {
  const chromaticDegree = fromAltDegree(degree);
  const diatonicInterval: DInterval = DI.fromInt(+degree.diatonicDegree);

  return fromIntervals( {
    chromaticInterval: chromaticDegree,
    diatonicInterval,
  } ) as Interval;
}
