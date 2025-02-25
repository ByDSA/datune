import { cyclicMod } from "@datune/utils";
import { Interval as ChromaticInterval } from "intervals/chromatic";
import { fromInt as DIFromInt, Interval as DiatonicInterval } from "intervals/diatonic";
import { Pitch } from "pitches/alt";
import { NUMBER as C_NUMBER } from "pitches/chromatic";
import { NUMBER as D_NUMBER } from "pitches/diatonic";
import { MAJOR_SCALE_DEGREES } from "scales/chromatic";
import Interval from "../Interval";
import fromIntervals from "./intervals";

export default function betweenNext(pitch1: Pitch, pitch2: Pitch): Interval | null {
  const intervalDiatonicInt = +pitch2.diatonic - +pitch1.diatonic;
  const diatonicInterval: DiatonicInterval = DIFromInt(
    cyclicMod(intervalDiatonicInt, D_NUMBER),
  );
  const intervalChromaticInt = MAJOR_SCALE_DEGREES[+pitch2.diatonic] + pitch2.alts
  - (MAJOR_SCALE_DEGREES[+pitch1.diatonic] + pitch1.alts);
  const chromaticInterval: ChromaticInterval = cyclicMod(intervalChromaticInt, C_NUMBER);

  return fromIntervals( {
    chromaticInterval,
    diatonicInterval,
  } );
}
