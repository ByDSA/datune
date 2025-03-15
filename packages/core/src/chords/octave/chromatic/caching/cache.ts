import type { Arrays } from "@datune/utils";
import { KeyMappedFlyweightCache } from "@datune/utils";
import { getKey as pitchGetKey } from "pitches/chromatic/caching/id";
import { Chord } from "../Chord";

export type Key = Arrays.Number;

export const getKey = (chord: Chord): Key => {
  return chord.pitches.map(pitchGetKey) as Arrays.Number;
};

export function getId(key: Key): string {
  return key.join("-");
}

export const cache = new KeyMappedFlyweightCache<Chord, Key, string>( {
  getId,
  getKey,
  create: (key)=> new (Chord as any)(key),
} );
