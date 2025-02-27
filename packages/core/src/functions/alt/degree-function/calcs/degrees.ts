import { DegreeArray, Degrees } from "degrees/alt";
import { Degrees as DDegrees } from "degrees/diatonic";
import { Intervals } from "intervals/alt";
import { Pitches as CPitches } from "pitches/chromatic";
import { Pitches as DPitches } from "pitches/diatonic";
import { DegreeFunction } from "../DegreeFunction";

export default function calcDegrees(obj: DegreeFunction): DegreeArray {
  const degrees = [];
  const chromaticDegree = Degrees.toChromaticDegree(obj.degree);

  for (const value of obj.voicing) {
    const diatonicDegreeInt = +obj.degree.diatonicDegree + +value.diatonicInterval;
    const diatonicDegree = DDegrees.fromInt(diatonicDegreeInt);
    const diatonic = DPitches.fromInt(+diatonicDegree);
    const chromatic = DPitches.toChromatic(diatonic);
    let alts = (chromaticDegree + Intervals.toChromaticInterval(value)) - +chromatic;

    alts %= CPitches.NUMBER;
    const degree = Degrees.from(diatonicDegree, alts);

    degrees.push(degree);
  }

  return <DegreeArray>degrees;
}
