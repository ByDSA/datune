import type { Dto } from "./Dto";
import { toDto as pitchToDto } from "pitches/chromatic/caching/toDto";
import { toDto as scaleToDto } from "scales/symbolic/chromatic/caching/toDto";
import { Key } from "../Key";

export function toDto(obj: Key): Dto {
  return [pitchToDto(obj.root), scaleToDto(obj.scale)];
}
