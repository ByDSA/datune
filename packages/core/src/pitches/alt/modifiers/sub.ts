import { DiatonicAltBuilder } from "../building/builders/DiatonicAltBuilder";
import { toChromatic } from "../conversions/chromatic";
import type { Pitch } from "../Pitch";
import { Interval, Intervals } from "intervals/alt";
import { Pitch as Chromatic, Pitches as CPitches } from "pitches/chromatic";
import type { Pitch as Diatonic } from "pitches/diatonic";
import { Pitches as DPitches } from "pitches/diatonic";

export function sub(obj: Pitch, interval: Interval): Pitch {
  const diatonic: Diatonic = DPitches.sub(obj.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = Intervals.toChromaticInterval(interval);
  const chromatic: Chromatic = CPitches.sub(toChromatic(obj), intervalChromaticInterval);

  return <Pitch>DiatonicAltBuilder.create().setNote(chromatic)
    .setDiatonic(diatonic)
    .build();
}
