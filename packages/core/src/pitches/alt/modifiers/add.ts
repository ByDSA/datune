import { DiatonicAltBuilder } from "../building/builders/DiatonicAltBuilder";
import { toChromatic } from "../conversions/chromatic";
import type { Pitch } from "../Pitch";
import type { Interval as DAInterval } from "intervals/alt";
import { toChromaticInterval } from "intervals/symbolic/alt/conversions/chromaticInterval";
import type { Pitch as Chromatic } from "pitches/chromatic";
import { Pitches as CPitches } from "pitches/chromatic";
import { Pitches as DPitches, Pitch as Diatonic } from "pitches/diatonic";

export function add(obj: Pitch, interval: DAInterval): Pitch {
  const diatonic: Diatonic = DPitches.add(obj.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = toChromaticInterval(interval);
  const chromatic: Chromatic = CPitches.add(toChromatic(obj), intervalChromaticInterval);

  return <Pitch>DiatonicAltBuilder.create().setNote(chromatic)
    .setDiatonic(diatonic)
    .build();
}
