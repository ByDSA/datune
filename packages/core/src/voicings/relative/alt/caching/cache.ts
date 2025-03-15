import type { IntervalArray } from "intervals/alt";
import { KeyMappedFlyweightCache } from "@datune/utils";
import { getObjId as intervalGetObjId } from "intervals/symbolic/alt/caching/cache";
import { Voicing } from "../Voicing";

export function getObjId(voicing: Voicing): string {
  return getId(getKey(voicing));
}

export type Key = IntervalArray;

export function getId(key: Key): string {
  return key.map(intervalGetObjId).join("-");
}

export function getKey(obj: Voicing): Key {
  return obj.rootIntervals;
}

export const cache = new KeyMappedFlyweightCache<Voicing, IntervalArray, string>( {
  getId,
  getKey,
  create: key=>new (Voicing as any)(key),
} );
