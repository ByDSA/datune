import { Degree as ChromaticDegree } from "degrees/chromatic";
import { Degree as DiatonicDegree } from "degrees/diatonic";
import { calcAlts, fixAlts } from "pitches/alt";
import Degree from "../Degree";
import cache from "./cache";

export function from(diatonicDegree: DiatonicDegree, alts: number): Degree {
  const fixedAlts = fixAlts(alts);

  return cache.getOrCreate( {
    diatonicDegree,
    alts: fixedAlts,
  } );
}

export function fromDegrees(diatonicDegree: DiatonicDegree, degree: ChromaticDegree): Degree {
  const alts = calcAlts(degree, diatonicDegree);

  return from(diatonicDegree, alts);
}
