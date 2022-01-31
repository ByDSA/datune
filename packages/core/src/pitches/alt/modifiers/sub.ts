import { Interval as DAInterval, toChromaticInterval } from "intervals/alt";
import { Pitch as Chromatic, sub as Csub } from "pitches/chromatic";
import { Pitch as Diatonic, sub as Dsub } from "pitches/diatonic";
import DiatonicAltBuilder from "../building/builders/DiatonicAltBuilder";
import toChromatic from "../conversions/chromatic";
import Pitch from "../Pitch";

export default function sub(obj: Pitch, interval: DAInterval): Pitch {
  const diatonic: Diatonic = Dsub(obj.diatonic, interval.diatonicInterval);
  const intervalChromaticInterval = toChromaticInterval(interval);
  const chromatic: Chromatic = Csub(toChromatic(obj), intervalChromaticInterval);

  return <Pitch>DiatonicAltBuilder.create().setNote(chromatic)
    .setDiatonic(diatonic)
    .build();
}
