import { KeyMappedFlyweightCache } from "@datune/utils";
import { IntervalArray } from "intervals/chromatic";
import { getObjId as intervalGetObjId } from "intervals/symbolic/chromatic/caching/id";
import { Scale } from "../Scale";

export type Key = IntervalArray;

export function getKey(scale: Scale): Key {
  return scale.rootIntervals;
}

export function getId(key: Key): string {
  return key.map(intervalGetObjId).join("-");
}

export function getObjId(obj: Scale): string {
  return getId(getKey(obj));
}

export const cache = new KeyMappedFlyweightCache<Scale, Key, string>( {
  getId,
  getKey,
  create: key=>new (Scale as any)(key),
} );
