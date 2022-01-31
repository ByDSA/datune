import { Interval as DAInterval, toChromaticInterval } from "intervals/alt";
import { add as Cadd, Pitch as Chromatic } from "pitches/chromatic";
import { add as Dadd, Pitch as Diatonic } from "pitches/diatonic";
import DiatonicAltBuilder from "../building/builders/DiatonicAltBuilder";
import toChromatic from "../conversions/chromatic";
import Pitch from "../Pitch";

export default function add(obj: Pitch, interval: DAInterval): Pitch {
  const diatonic: Diatonic = Dadd(obj.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = toChromaticInterval(interval);
  const chromatic: Chromatic = Cadd(toChromatic(obj), intervalChromaticInterval);

  return <Pitch>DiatonicAltBuilder.create().setNote(chromatic)
    .setDiatonic(diatonic)
    .build();
}
