import { StringHashCache } from "@datune/utils";
import { SPNArray } from "spns/chromatic";
import { Chord } from "../../Chord";

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
