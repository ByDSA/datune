import Scale from "../Scale";
import dtoHash from "./hash";

export default function hash(obj: Scale): string {
  return dtoHash(obj.rootIntervals);
}
