import { StringHashCache } from "@datune/utils";
import { SPNChord } from "../../Chord";
import { SPNArray } from "spns/chromatic";

type HashingObjectType = SPNArray;

export const cache = new StringHashCache<SPNChord, HashingObjectType>( {
  hash(hashingObject: HashingObjectType): string {
    return hashingObject.map(String).join("-");
  },
  toDto(chord: SPNChord): HashingObjectType {
    return chord.pitches;
  },
  create: (SPNChord as any).create,
} );
