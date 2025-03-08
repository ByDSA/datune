/* eslint-disable no-redeclare */
import type { Interval } from "../Interval";
import type { Interval as ChromaticInterval } from "intervals/chromatic";
import type { Pitch } from "pitches/alt";
import { cyclicMod } from "@datune/utils";
import { Intervals as DIntervals, Interval as DInterval } from "intervals/diatonic";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { Scales as CScales } from "scales/chromatic";
import { Degree, Pitches } from "alt";
import { fromIntervals } from "./intervals";

export function betweenNext(from: Degree, to: Degree): Interval | null;

export function betweenNext(from: Pitch, to: Pitch): Interval | null;

export function betweenNext(from: Degree | Pitch, to: Degree | Pitch): Interval | null {
  let pitch1: Pitch;
  let pitch2: Pitch;

  if (from instanceof Degree) {
    pitch1 = Pitches.fromDiatonicAlts(DP.fromInt(+from.diatonicDegree), from.alts);
    pitch2 = Pitches.fromDiatonicAlts(DP.fromInt(+(to as any).diatonicDegree), to.alts);
  } else {
    pitch1 = from;
    pitch2 = to as any;
  }

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
