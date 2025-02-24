import { Pitch as Diatonic } from "pitches/diatonic";
import { cache } from "../caching";
import Pitch from "../Pitch";

export default function from(diatonic: Diatonic, alts: number): Pitch {
  return cache.getOrCreate( {
    diatonic,
    alts,
  } );
}
