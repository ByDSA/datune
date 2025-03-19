import type { Interval } from "@datune/core/intervals/chromatic";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { SingleStep } from "./SingleStep";

export type Key = {
  index: number;
  interval: Interval | null;
};

export const cache = new KeyMappedFlyweightCache<SingleStep, Key, string>( {
  getId(key: Key): string {
    return `${key.index}:${key.interval}`;
  },
  getKey(sst: SingleStep): Key {
    return {
      index: sst.index,
      interval: sst.interval,
    };
  },
  create: key=>new (SingleStep as any)(key),
} );
