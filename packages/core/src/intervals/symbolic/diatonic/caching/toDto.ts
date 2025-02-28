import type { Interval } from "..";
import type { Dto } from "./Dto";

export function toDto(obj: Interval): Dto {
  return {
    magnitude: obj.magnitude,
    direction: obj.direction,
  };
}
