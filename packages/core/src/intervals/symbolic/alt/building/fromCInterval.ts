import type { Interval } from "alt";
import type { Interval as CInterval } from "chromatic";
import { Intervals as DI } from "diatonic";
import { fromIntervals } from "./intervals";

export function fromChromaticInterval(cInterval: CInterval): Interval {
  const dInterval = DI.fromChromaticInterval(cInterval);

  return fromIntervals( {
    chromaticInterval: cInterval,
    diatonicInterval: dInterval,
  } );
}
