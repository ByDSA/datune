import { StringHashCache } from "@datune/utils";
import { Chord } from "../../Chord";
import { SPNArray } from "spns/chromatic";

type HashingObjectType = SPNArray;

export const cache = new StringHashCache<Chord, HashingObjectType>( {
  hash(hashingObject: HashingObjectType): string {
    return hashingObject.map(String).join("-");
  },
  toDto(chord: Chord): HashingObjectType {
    return chord.pitches;
  },
  create: (Chord as any).create,
} );
