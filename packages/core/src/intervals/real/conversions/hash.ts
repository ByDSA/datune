import type { Interval } from "../Interval";
import { hashDto } from "../building/dto/Dto";

export function hash(obj: Interval): string {
  return hashDto(obj.ratio);
}
