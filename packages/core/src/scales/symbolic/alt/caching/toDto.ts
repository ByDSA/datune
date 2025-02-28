import { Scale } from "../Scale";
import type { Dto } from "./Dto";

export function toDto(obj: Scale): Dto {
  return obj.rootIntervals;
}
