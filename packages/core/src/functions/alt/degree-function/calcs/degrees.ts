import { Array as DegreeArray, from as degreeFrom, toChromaticDegree as degreeToChromatic } from "degrees/alt";
import { fromInt as diatonicDegreeFromInt } from "degrees/diatonic";
import { toChromaticInterval } from "intervals/alt";
import { NUMBER as C_NUMBER } from "pitches/chromatic";
import { fromInt as diatonicFromInt, toChromatic as diatonicToChromatic } from "pitches/diatonic";
import DegreeFunction from "../DegreeFunction";

export default function calcDegrees(obj: DegreeFunction): DegreeArray {
  const degrees = [];
  const chromaticDegree = degreeToChromatic(obj.degree);

  for (const value of obj.voicing) {
    const diatonicDegreeInt = +obj.degree.diatonicDegree + +value.diatonicInterval;
    const diatonicDegree = diatonicDegreeFromInt(diatonicDegreeInt);
    const diatonic = diatonicFromInt(+diatonicDegree);
    const chromatic = diatonicToChromatic(diatonic);
    let alts = (chromaticDegree + toChromaticInterval(value)) - +chromatic;

    alts %= C_NUMBER;
    const degree = degreeFrom(diatonicDegree, alts);

    degrees.push(degree);
  }

  return <DegreeArray>degrees;
}
