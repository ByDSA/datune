import type { Dto } from "../building/dto/Dto";
import type { Interval } from "../Interval";

export function toDto(obj: Interval): Dto {
  return obj.ratio;
}
