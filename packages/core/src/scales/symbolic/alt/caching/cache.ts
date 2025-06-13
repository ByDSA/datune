import type { DegreeArray } from "alt";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { getObjId as intervalGetObjId } from "intervals/symbolic/alt/caching/cache";
import { Scale } from "../Scale";

export type Key = DegreeArray | Readonly<DegreeArray>;

export function getId(key: Key): string {
  return key.map(intervalGetObjId).join("|");
}

export function getObjId(scale: Scale): string {
  return getId(getKey(scale));
}

export function getKey(scale: Scale): Key {
  return scale.degrees;
}

export const cache = new KeyMappedFlyweightCache<Scale, Key, string>( {
  getId,
  getKey,
  create: key=>new (Scale as any)(key),
} );
