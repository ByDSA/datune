import type { Interval } from "intervals/alt";
import type { Interval as DInterval } from "intervals/diatonic";
import { cyclicOctave as cCyclicOctave } from "intervals/symbolic/chromatic/modifiers";
import { fromIntervals } from "./intervals";

export function fromDiatonicInterval(diatonicInterval: DInterval, alts = 0): Interval {
  const chromaticDegree = cCyclicOctave(
    diatonicInterval.toChromaticInterval() + alts,
  );

  return fromIntervals( {
    chromaticInterval: chromaticDegree,
    diatonicInterval,
  } ) as Interval;
}
