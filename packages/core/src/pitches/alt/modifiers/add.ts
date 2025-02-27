import DiatonicAltBuilder from "../building/builders/DiatonicAltBuilder";
import toChromatic from "../conversions/chromatic";
import Pitch from "../Pitch";
import { Interval as DAInterval } from "intervals/alt";
import toChromaticInterval from "intervals/symbolic/alt/conversions/chromaticInterval";
import { Pitches as CPitches, Pitch as Chromatic } from "pitches/chromatic";
import { Pitches as DPitches, Pitch as Diatonic } from "pitches/diatonic";

export function add(obj: Pitch, interval: DAInterval): Pitch {
  const diatonic: Diatonic = DPitches.add(obj.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = toChromaticInterval(interval);
  const chromatic: Chromatic = CPitches.add(toChromatic(obj), intervalChromaticInterval);

  return <Pitch>DiatonicAltBuilder.create().setNote(chromatic)
    .setDiatonic(diatonic)
    .build();
}
