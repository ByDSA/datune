import type { Interval } from "../Interval";
import { Intervals as CI } from "intervals/chromatic";
import { calcAlts as pitchCalcAlts } from "pitches/alt/calcAlts";

export function calcAlts(interval: Interval) {
  const cInterval = CI.fromAltInterval(interval);

  return pitchCalcAlts(cInterval, interval.diatonicInterval);
}
