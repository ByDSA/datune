import { dtoHash } from "../building";
import Key from "../Key";

export function hashCode(obj: Key): string {
  return dtoHash(obj);
}

export {
  default as toChromatic,
} from "./chromatic";

export {
  default as toDto,
} from "./dto";
