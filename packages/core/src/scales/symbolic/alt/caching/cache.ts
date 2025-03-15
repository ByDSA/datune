import { KeyMappedFlyweightCache } from "@datune/utils";
import { getObjId as intervalGetObjId } from "intervals/symbolic/alt/caching/cache";
import { IntervalArray } from "intervals/alt";
import { Scale } from "../Scale";

export type Key = IntervalArray;

export function getId(key: Key): string {
  return key.map(intervalGetObjId).join("|");
}

export function getObjId(scale: Scale): string {
  return getId(getKey(scale));
}

export function getKey(scale: Scale): Key {
  return scale.rootIntervals;
}

export const cache = new KeyMappedFlyweightCache<Scale, Key, string>( {
  getId,
  getKey,
  create: key=>new (Scale as any)(key),
} );
