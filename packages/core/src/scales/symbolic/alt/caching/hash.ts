import { Scale } from "../Scale";
import { hashDto as dtoHash } from "./Dto";

export function hash(obj: Scale): string {
  return dtoHash(obj.rootIntervals);
}
