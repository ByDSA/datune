import { KeyMappedFlyweightCache } from "@datune/utils";
import { SPNArray } from "spns/chromatic";
import { Chord } from "../../Chord";

export type Key = SPNArray;

export const cache = new KeyMappedFlyweightCache<Chord, Key, string>( {
  getId(key: Key): string {
    return key.map(String).join("-");
  },
  getKey(chord: Chord): Key {
    return chord.pitches;
  },
  create: key=>new (Chord as any)(key),
} );
