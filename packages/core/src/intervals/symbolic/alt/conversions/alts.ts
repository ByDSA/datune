import type { Interval } from "../Interval";
import { calcAlts as pitchCalcAlts } from "pitches/alt/calcAlts";
import { toChromaticInterval } from "./chromaticInterval";

export function calcAlts(interval: Interval) {
  const cInterval = toChromaticInterval(interval);

  return pitchCalcAlts(cInterval, interval.diatonicInterval);
}
