import { cache } from "../caching/cache";
import type { Pitch } from "../Pitch";
import type { Pitch as Diatonic } from "pitches/diatonic";

export function fromDiatonicAlts(diatonic: Diatonic, alts: number): Pitch {
  return cache.getOrCreate( {
    diatonic,
    alts,
  } );
}
