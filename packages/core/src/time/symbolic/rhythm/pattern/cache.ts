import { Arrays, StringHashCache } from "@datune/utils";
import Pattern from "./Pattern";

type HashingObject = Arrays.Number;
const cache = new StringHashCache<Pattern, HashingObject>( {
  hash(hashingObject: HashingObject): string {
    return hashingObject.toString();
  },
  toDto(pattern: Pattern): HashingObject {
    return pattern.array;
  },
  create(hashingObject: HashingObject): Pattern {
    return (Pattern as any).create(...hashingObject);
  },
} );

export default cache;
