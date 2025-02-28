import { cache } from "../../caching/cache";
import { Chord } from "../../Chord";
import type { PitchArray } from "pitches/alt";

export function fromPitches(...pitches: PitchArray): Chord {
  return cache.getOrCreate(pitches);
}
