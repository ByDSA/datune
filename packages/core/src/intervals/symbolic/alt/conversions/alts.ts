import type { Interval } from "../Interval";
import { toChromaticInterval } from "./chromaticInterval";
import { calcAlts as pitchCalcAlts } from "pitches/alt/calcAlts";

export function calcAlts(intervalDiatonicAlt: Interval) {
  const chromaticInterval = toChromaticInterval(intervalDiatonicAlt);

  return pitchCalcAlts(chromaticInterval, intervalDiatonicAlt.diatonicInterval);
}
