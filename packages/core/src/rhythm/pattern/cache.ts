import { Arrays, KeyMappedFlyweightCache } from "@datune/utils";
import { RhythmPattern } from "./Pattern";

export type Key = Arrays.Number;

export const cache = new KeyMappedFlyweightCache<RhythmPattern, Key, string>( {
  getId(key: Key): string {
    return key.toString();
  },
  getKey(pattern: RhythmPattern): Key {
    return pattern.array;
  },
  create: key=>new (RhythmPattern as any)(key),
} );
