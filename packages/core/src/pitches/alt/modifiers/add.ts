import type { Pitch } from "../Pitch";
import type { Interval as AInterval } from "intervals/alt";
import type { Pitch as CPitch } from "pitches/chromatic";
import { toChromaticInterval } from "intervals/symbolic/alt/conversions/chromaticInterval";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP, Pitch as DPitch } from "pitches/diatonic";
import { toChromatic } from "../conversions/chromatic";
import { DiatonicAltBuilder } from "../building/builders/DiatonicAltBuilder";

export function add(obj: Pitch, interval: AInterval): Pitch {
  const diatonic: DPitch = DP.add(obj.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = toChromaticInterval(interval);
  const chromatic: CPitch = CP.add(toChromatic(obj), intervalChromaticInterval);

  return <Pitch>DiatonicAltBuilder.create().setNote(chromatic)
    .setDiatonic(diatonic)
    .build();
}
