import type { PitchSet } from "../PitchSet";
import type { PitchArray } from "pitches/chromatic";
import { cache } from "../caching/cache";

export function from(...pitches: PitchArray): PitchSet {
  const set = new Set(pitches);

  return cache.getOrCreate(set);
}
