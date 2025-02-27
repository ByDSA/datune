import { StringHashCache } from "@datune/utils";
import { SPNArray } from "spns/chromatic";
import { SPNChord } from "../../Chord";

type HashingObjectType = SPNArray;

const cache = new StringHashCache<SPNChord, HashingObjectType>( {
  hash(hashingObject: HashingObjectType): string {
    return hashingObject.map(String).join("-");
  },
  toDto(chord: SPNChord): HashingObjectType {
    return chord.pitches;
  },
  create: (SPNChord as any).create,
} );

export default cache;
