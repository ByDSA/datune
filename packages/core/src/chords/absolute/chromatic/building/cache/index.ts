import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { SpnArray } from "spns/chromatic";
import { Chord } from "../../Chord";

export type Key = {
  pitches: SpnArray;
  rootIndex: number;
};

export const cache = new KeyMappedFlyweightCache<Chord, Key, string>( {
  getId(key: Key): string {
    return key.rootIndex + "|" + key.pitches.map(String).join("-");
  },
  getKey(chord: Chord): Key {
    return {
      pitches: chord.pitches,
      rootIndex: chord.rootIndex,
    };
  },
  create: key=>new (Chord as any)(key),
} );
