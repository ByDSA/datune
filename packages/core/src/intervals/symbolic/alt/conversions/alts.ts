import type { Interval } from "../Interval";
import { toChromaticInterval } from "./chromaticInterval";
import { Pitches } from "pitches/alt";

export function calcAlts(intervalDiatonicAlt: Interval) {
  const chromaticInterval = toChromaticInterval(intervalDiatonicAlt);

  return Pitches.calcAlts(chromaticInterval, intervalDiatonicAlt.diatonicInterval);
}
