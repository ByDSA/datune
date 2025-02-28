import { cache } from "../caching/cache";
import type { NoteSet } from "../NoteSet";
import { PitchArray, Pitch } from "pitches/chromatic";

export function from(...pitches: PitchArray): NoteSet {
  const set = pitches2Set(...pitches);

  return cache.getOrCreate(set);
}

function pitches2Set(...notes: PitchArray): Set<Pitch> {
  const set = new Set<Pitch>();

  for (const n of notes)
    set.add(n);

  return set;
}
