import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { getObjId as intervalGetObjId } from "intervals/symbolic/chromatic/caching/id";
import { IntervalArray } from "intervals/chromatic";
import { Voicing } from "../Voicing";

export type Key = IntervalArray;

function getId(key: Key) {
  return `(${key.map(intervalGetObjId).join("-")})`;
}

function getKey(voicing: Voicing) {
  return voicing.rootIntervals;
}

export function getObjId(voicing: Voicing): string {
  return getId(getKey(voicing));
}

export const cache = new KeyMappedFlyweightCache<Voicing, Key, string>( {
  getId,
  getKey,
  create: key=>new (Voicing as any)(key),
} );
