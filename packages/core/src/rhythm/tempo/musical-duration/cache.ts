import type { MusicalDuration } from "./MusicalDuration";
import { KeyMappedFlyweightCache } from "@datune/utils";

export type Key = number;

// TODO: UNUSED
export const cache = new KeyMappedFlyweightCache<MusicalDuration, Key, string>( {
  getId: (key: Key) => String(key),
  getKey: (md: MusicalDuration): Key => +md,
  create: key => key,
} );
