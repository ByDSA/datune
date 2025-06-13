import type { DegreeArray } from "chromatic";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { getObjId as intervalGetObjId } from "intervals/symbolic/chromatic/caching/id";
import { Scale } from "../Scale";

export type Key = DegreeArray | Readonly<DegreeArray>;

export function getKey(scale: Scale): Key {
  return scale.degrees;
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
