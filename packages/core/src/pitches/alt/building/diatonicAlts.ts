import { cache } from "../caching";
import Pitch from "../Pitch";
import { Pitch as Diatonic } from "pitches/diatonic";

export function fromDiatonicAlts(diatonic: Diatonic, alts: number): Pitch {
  return cache.getOrCreate( {
    diatonic,
    alts,
  } );
}
