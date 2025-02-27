import { Pitches } from "pitches/alt";
import Interval from "../Interval";
import toChromaticInterval from "./chromaticInterval";

export default function calculateAlts(intervalDiatonicAlt: Interval) {
  const chromaticInterval = toChromaticInterval(intervalDiatonicAlt);

  return Pitches.calcAlts(chromaticInterval, intervalDiatonicAlt.diatonicInterval);
}
