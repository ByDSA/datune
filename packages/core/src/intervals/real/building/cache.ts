import type { NumExp } from "@datune/utils/math";
import { KeyMappedFlyweightCache } from "@datune/utils";
import { Interval } from "../Interval";

export type Key = NumExp;

export function getId(key: Key): string {
  return String(+key);
}

export function getKey(interval: Interval): Key {
  return interval.ratio;
}

export function getObjId(interval: Interval): string {
  return getId(getKey(interval));
}

export const cache = new KeyMappedFlyweightCache<Interval, Key, string>( {
  getId,
  getKey,
  create: key=>new (Interval as any)(key),
} );
