import type { PitchArray } from "pitches/chromatic";
import { cache, Key } from "../../caching/cache";
import { Chord } from "../../Chord";

export function fromPitches(...pitches: PitchArray): Chord {
  return from( {
    pitches,
    rootIndex: 0,
  } );
}

export function from(key: Key): Chord {
  if (key.rootIndex < 0)
    throw new Error("Invalid root index");

  return cache.getOrCreate(key);
}
