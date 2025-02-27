/* eslint-disable import/prefer-default-export */
import { PitchArray as PitchArray, Pitch } from "pitches/chromatic";
import cache from "../caching/cache";
import NoteSet from "../NoteSet";

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
