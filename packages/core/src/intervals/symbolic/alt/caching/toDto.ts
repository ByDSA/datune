import type { Interval } from "../Interval";
import type { Dto } from "./Dto";

export function toDto(obj: Interval): Dto {
  return {
    diatonicInterval: obj.diatonicInterval,
    quality: obj.quality,
  };
}
