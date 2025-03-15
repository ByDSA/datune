import { KeyMappedFlyweightCache } from "@datune/utils";
import { Interval } from "../Interval";
import { getId, getKey, type Key } from "./key-id";

export const cache = new KeyMappedFlyweightCache<Interval, Key, string>( {
  getId,
  getKey,
  create: key=>new (Interval as any)(key),
} );
