import type { Interval as IntervalPitch } from "intervals/real";
import { KeyMappedFlyweightCache } from "datils/caching";
import { NonEmptyArray } from "datils";
import { getObjId as intervalGetObjId } from "intervals/real/building/cache";
import { Scale } from "../../Scale";

export type Key = NonEmptyArray<IntervalPitch>;

export function getId(key: Key): string {
  return key.map(intervalGetObjId).join("-");
}

export const cache = new KeyMappedFlyweightCache<Scale, Key, string>( {
  getId,
  getKey(scale: Scale): Key {
    return scale.intraIntervals;
  },
  create: key=>new (Scale as any)(key),
} );
