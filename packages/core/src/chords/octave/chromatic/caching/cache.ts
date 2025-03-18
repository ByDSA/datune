import type { NonEmptyNumberArray } from "datils/datatypes";
import { KeyMappedFlyweightCache } from "datils/caching";
import { getKey as pitchGetKey } from "pitches/chromatic/caching/id";
import { Chord } from "../Chord";

export type Key = NonEmptyNumberArray;

export const getKey = (chord: Chord): Key => {
  return chord.pitches.map(pitchGetKey) as NonEmptyNumberArray;
};

export function getId(key: Key): string {
  return key.join("-");
}

export const cache = new KeyMappedFlyweightCache<Chord, Key, string>( {
  getId,
  getKey,
  create: (key)=> new (Chord as any)(key),
} );
