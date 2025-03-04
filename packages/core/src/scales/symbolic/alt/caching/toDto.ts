import type { Dto } from "./Dto";
import { Scale } from "../Scale";

export function toDto(obj: Scale): Dto {
  return obj.rootIntervals;
}
