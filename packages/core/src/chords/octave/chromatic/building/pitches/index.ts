import type { PitchArray } from "pitches/chromatic";
import { PitchSets as PS } from "sets/pitch-set/chromatic";
import { cache, Key } from "../../caching/cache";
import { Chord } from "../../Chord";

export function fromPitches(...pitches: PitchArray): Chord {
  return from( {
    pitchSet: PS.fromPitches(...pitches),
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
