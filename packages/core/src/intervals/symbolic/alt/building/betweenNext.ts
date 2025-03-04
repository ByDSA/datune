import type { Interval } from "../Interval";
import type { Interval as ChromaticInterval } from "intervals/chromatic";
import type { Pitch } from "pitches/alt";
import { cyclicMod } from "@datune/utils";
import { Intervals as DIntervals, Interval as DInterval } from "intervals/diatonic";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { Scales as CScales } from "scales/chromatic";
import { fromIntervals } from "./intervals";

export function betweenNext(pitch1: Pitch, pitch2: Pitch): Interval | null {
  const intervalDiatonicInt = +pitch2.diatonic - +pitch1.diatonic;
  let diatonicInterval: DInterval = DIntervals.fromInt(
    cyclicMod(intervalDiatonicInt, DP.NUMBER),
  );
  const intervalChromaticInt = CScales.MAJOR_SCALE_DEGREES[+pitch2.diatonic] + pitch2.alts
  - (CScales.MAJOR_SCALE_DEGREES[+pitch1.diatonic] + pitch1.alts);
  const chromaticInterval: ChromaticInterval = cyclicMod(intervalChromaticInt, CP.NUMBER);

  if (diatonicInterval === DIntervals.UNISON && intervalChromaticInt < 0)
    diatonicInterval = DIntervals.add(diatonicInterval, DIntervals.OCTAVE);

  return fromIntervals( {
    chromaticInterval,
    diatonicInterval,
  } );
}
