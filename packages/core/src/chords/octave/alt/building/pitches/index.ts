import type { PitchArray } from "pitches/alt";
import { fromPitches as PSfrom } from "sets/pitch-set/alt/building";
import { cache, Key } from "../../caching/cache";
import { Chord } from "../../Chord";

export function fromPitches(...pitches: PitchArray): Chord {
  return from( {
    pitchSet: PSfrom(...pitches),
    root: pitches[0],
    bass: pitches[0],
  } );
}

export function from(key: Key): Chord {
  let { pitchSet } = key;

  if (key.bass === key.root)
    pitchSet = pitchSet.withAdd(key.bass);

  return cache.getOrCreate( {
    ...key,
    pitchSet,
  } );
}
