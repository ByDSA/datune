import type { Quality } from "../quality/Quality";
import type { Interval as DiatonicInterval } from "intervals/diatonic";
import { KeyMappedFlyweightCache } from "datils/caching";
import { getObjId as dIntervalGetObjId } from "intervals/symbolic/diatonic/caching/key-id";
import { Interval } from "../Interval";
import { getObjId as qualityGetObjId } from "../quality/building/id";

export type Key = {
  diatonicInterval: DiatonicInterval;
  quality: Quality;
};

export function getId(key: Key): string {
  const qualityId = qualityGetObjId(key.quality);
  const dIntervalId = dIntervalGetObjId(key.diatonicInterval);

  return `${dIntervalId}${qualityId}`;
}

export function getKey(interval: Interval): Key {
  return {
    diatonicInterval: interval.diatonicInterval,
    quality: interval.quality,
  };
}

export function getObjId(interval: Interval): string {
  return getId(getKey(interval));
}

export const cache = new KeyMappedFlyweightCache<Interval, Key, string>( {
  getId,
  getKey,
  create: key=>new (Interval as any)(key),
} );
