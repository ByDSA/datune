import type { PitchArray } from "pitches/alt";
import { cache } from "../../caching/cache";
import { Chord } from "../../Chord";

export function fromPitches(...pitches: PitchArray): Chord {
  return cache.getOrCreate(pitches);
}
