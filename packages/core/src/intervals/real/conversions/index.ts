import { dtoHash } from "../building";
import Interval from "../Interval";

export function hash(obj: Interval): string {
  return dtoHash(obj.ratio);
}

export {
  default as toDto,
} from "./dto";
