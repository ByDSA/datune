import type { PitchSet } from "../PitchSet";
import type { Pitch } from "pitches/chromatic";
import { cache } from "../caching/cache";

export function fromPitches(...pitches: Pitch[]): PitchSet {
  const set = new Set(pitches);

  return from(set);
}

export function from(set: Set<Pitch>): PitchSet {
  return cache.getOrCreate(set);
}
