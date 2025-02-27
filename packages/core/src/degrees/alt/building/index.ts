import Degree from "../Degree";
import cache from "./cache";
import { Degree as ChromaticDegree } from "degrees/chromatic";
import { Degree as DiatonicDegree } from "degrees/diatonic";
import { Pitches } from "pitches/alt";

export function from(diatonicDegree: DiatonicDegree, alts: number): Degree {
  const fixedAlts = Pitches.fixAlts(alts);

  return cache.getOrCreate( {
    diatonicDegree,
    alts: fixedAlts,
  } );
}

export function fromDegrees(diatonicDegree: DiatonicDegree, degree: ChromaticDegree): Degree {
  const alts = Pitches.calcAlts(degree, diatonicDegree);

  return from(diatonicDegree, alts);
}
