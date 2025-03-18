import type { PitchArray } from "pitches/chromatic";
import { NonEmptyNumberArray } from "datils";
import { getKey as pitchGetKey } from "pitches/chromatic/caching/id";
import { cache } from "../../caching/cache";
import { Chord } from "../../Chord";

export function fromPitches(...pitches: PitchArray): Chord {
  const pitchesKey = pitches.map(pitchGetKey) as NonEmptyNumberArray;

  return cache.getOrCreate(pitchesKey);
}
