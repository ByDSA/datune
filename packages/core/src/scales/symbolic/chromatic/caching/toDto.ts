import type { Dto } from "./Dto";
import type { Scale } from "../Scale";

export function toDto(obj: Scale): Dto {
  return obj.rootIntervals;
}
