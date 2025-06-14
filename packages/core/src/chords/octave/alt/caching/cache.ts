import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { PitchSet } from "sets/pitch-sets/alt/PitchSet";
import { Pitch } from "pitches/alt";
import { getId as getPitchSetId, getKey as getPitchSetKey } from "sets/pitch-sets/alt/caching/cache";
import { Chord } from "../Chord";

export type Key = {
  pitchSet: PitchSet;
  root: Pitch;
  bass: Pitch;
};

function getKey(chord: Chord): Key {
  return {
    pitchSet: chord.pitchSet,
    root: chord.root,
    bass: chord.bass,
  };
}

export function getId(key: Key): string {
  return +key.root + "|" + +key.bass + "|" + getPitchSetId(getPitchSetKey(key.pitchSet));
}

export const cache = new KeyMappedFlyweightCache<Chord, Key, string>( {
  getId,
  getKey,
  create: (key: Key) => new (Chord as any)(key),
} );
