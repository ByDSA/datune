import { KeyMappedFlyweightCache } from "datils/caching";
import { NonEmptyNumberArray } from "datils";
import { RhythmPattern } from "./Pattern";

export type Key = NonEmptyNumberArray;

export const cache = new KeyMappedFlyweightCache<RhythmPattern, Key, string>( {
  getId(key: Key): string {
    return key.toString();
  },
  getKey(pattern: RhythmPattern): Key {
    return pattern.array;
  },
  create: key=>new (RhythmPattern as any)(key),
} );
