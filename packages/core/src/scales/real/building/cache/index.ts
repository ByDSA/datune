import type { Arrays } from "@datune/utils";
import type { Interval as IntervalPitch } from "intervals/real";
import { KeyMappedFlyweightCache } from "@datune/utils";
import { getObjId as intervalGetObjId } from "intervals/real/building/cache";
import { Scale } from "../../Scale";

export type Key = Arrays.NonEmpty<IntervalPitch>;

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
