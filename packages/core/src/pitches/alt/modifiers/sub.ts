import type { Pitch } from "../Pitch";
import type { Pitch as DPitch } from "pitches/diatonic";
import { Interval, Intervals } from "intervals/alt";
import { Pitch as CPitch, Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { toChromatic } from "../conversions/chromatic";
import { DiatonicAltBuilder } from "../building/builders/DiatonicAltBuilder";

export function sub(obj: Pitch, interval: Interval): Pitch {
  const diatonic: DPitch = DP.sub(obj.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = Intervals.toChromaticInterval(interval);
  const chromatic: CPitch = CP.sub(toChromatic(obj), intervalChromaticInterval);

  return <Pitch>DiatonicAltBuilder.create().setNote(chromatic)
    .setDiatonic(diatonic)
    .build();
}
