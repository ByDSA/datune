import type { Key as ScaleKey } from "scales/symbolic/chromatic/caching/cache";
import type { Key as PitchKey } from "pitches/chromatic/caching/id";
import { KeyMappedFlyweightCache } from "@datune/utils";
import { getKey as scaleGetKey } from "scales/symbolic/chromatic/caching/cache";
import { getKey as pitchGetKey } from "pitches/chromatic/caching/id";
import { Key } from "../";

type K = [PitchKey, ScaleKey];

function getId(key: K): string {
  return `${key[1].join("-")}:${key[0]}`;
}

export function getKey(key: Key): K {
  return [pitchGetKey(key.root), scaleGetKey(key.scale)];
}

export function getObjId(key: Key): string {
  return getId(getKey(key));
}

export const cache = new KeyMappedFlyweightCache<Key, K, string>( {
  getId,
  getKey,
  create: key => new (Key as any)(key),
} );

export {
  type K as Key,
};
