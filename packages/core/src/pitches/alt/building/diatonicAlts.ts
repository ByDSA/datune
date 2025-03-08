import type { Pitch } from "../Pitch";
import type { Pitch as DPitch } from "pitches/diatonic";
import { cache } from "../caching/cache";

export function fromDPitchAlts(dPitch: DPitch, alts: number): Pitch {
  return cache.getOrCreate( {
    diatonic: dPitch,
    alts,
  } );
}
