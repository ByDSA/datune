import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { Pitch } from "chromatic";
import { PitchSet } from "sets/pitch-sets/chromatic/PitchSet";
import { getId as getPitchSetId, getKey as getPitchSetKey } from "sets/pitch-sets/chromatic/caching/cache";
import { Chord } from "../Chord";

export type Key = {
  root: Pitch;
  bass: Pitch;
  pitchSet: PitchSet;
};

export const getKey = (chord: Chord): Key => {
  return {
    pitchSet: chord.pitchSet,
    root: chord.root,
    bass: chord.bass,
  };
};

export function getId(key: Key): string {
  return +key.root + "|" + +key.bass + "|" + getPitchSetId(getPitchSetKey(key.pitchSet));
}

export const cache = new KeyMappedFlyweightCache<Chord, Key, string>( {
  getId,
  getKey,
  create: (key)=> new (Chord as any)(key),
} );
