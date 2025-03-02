import { cyclicMod } from "@datune/utils";
import type { Interval } from "../Interval";
import { fromIntervals } from "./intervals";
import type { Interval as ChromaticInterval } from "intervals/chromatic";
import { Intervals as DIntervals, Interval as DInterval } from "intervals/diatonic";
import type { Pitch } from "pitches/alt";
import { Pitches as CPitches } from "pitches/chromatic";
import { Pitches as DPitches } from "pitches/diatonic";
import { Scales as CScales } from "scales/chromatic";

export function betweenNext(pitch1: Pitch, pitch2: Pitch): Interval | null {
  const intervalDiatonicInt = +pitch2.diatonic - +pitch1.diatonic;
  let diatonicInterval: DInterval = DIntervals.fromInt(
    cyclicMod(intervalDiatonicInt, DPitches.NUMBER),
  );
  const intervalChromaticInt = CScales.MAJOR_SCALE_DEGREES[+pitch2.diatonic] + pitch2.alts
  - (CScales.MAJOR_SCALE_DEGREES[+pitch1.diatonic] + pitch1.alts);
  const chromaticInterval: ChromaticInterval = cyclicMod(intervalChromaticInt, CPitches.NUMBER);

  if (diatonicInterval === DIntervals.UNISON && intervalChromaticInt < 0)
    diatonicInterval = DIntervals.add(diatonicInterval, DIntervals.OCTAVE);

  return fromIntervals( {
    chromaticInterval,
    diatonicInterval,
  } );
}
