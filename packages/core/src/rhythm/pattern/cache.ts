import { Arrays, StringHashCache } from "@datune/utils";
import { RhythmPattern } from "./Pattern";

type HashingObject = Arrays.Number;
export const cache = new StringHashCache<RhythmPattern, HashingObject>( {
  hash(hashingObject: HashingObject): string {
    return hashingObject.toString();
  },
  toDto(pattern: RhythmPattern): HashingObject {
    return pattern.array;
  },
  create(hashingObject: HashingObject): RhythmPattern {
    return (RhythmPattern as any).create(...hashingObject);
  },
} );
