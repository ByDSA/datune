import type { Key } from "../../Key";
import { hash as dtoHash } from "./Dto";

export function hash(obj: Key): string {
  return dtoHash(obj);
}
