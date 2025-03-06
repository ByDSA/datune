import type { PitchSet } from "../PitchSet";
import type { PitchArray, Pitch } from "pitches/chromatic";
import { cache } from "../caching/cache";

export function from(...pitches: PitchArray): PitchSet {
  const set = pitches2Set(...pitches);

  return cache.getOrCreate(set);
}

function pitches2Set(...notes: PitchArray): Set<Pitch> {
  const set = new Set<Pitch>();

  for (const n of notes)
    set.add(n);

  return set;
}
