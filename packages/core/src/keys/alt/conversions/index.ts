import { hash as dtoHash } from "../building/dto/Dto";
import { Key } from "../Key";

export function hash(obj: Key): string {
  return dtoHash(obj);
}

export {
  toChromatic,
} from "./chromatic";

export {
  toDto,
} from "./dto";
