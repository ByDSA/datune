import type { Degree } from "../Degree";
import { cache } from "../caching/cache";
import { Degree as ChromaticDegree } from "degrees/chromatic";
import { Degree as DiatonicDegree } from "degrees/diatonic";
import { fixAlts } from "pitches/alt/fixAlts";
import { calcAlts } from "pitches/alt/calcAlts";

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
