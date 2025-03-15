import type { Arrays } from "@datune/utils";
import type { PitchArray } from "pitches/chromatic";
import { getKey as pitchGetKey } from "pitches/chromatic/caching/id";
import { cache } from "../../caching/cache";
import { Chord } from "../../Chord";

export function fromPitches(...pitches: PitchArray): Chord {
  const pitchesKey = pitches.map(pitchGetKey) as Arrays.Number;

  return cache.getOrCreate(pitchesKey);
}
