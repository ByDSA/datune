import { Key } from "../Key";
import { Dto } from "./Dto";
import pitchToDto from "pitches/chromatic/caching/toDto";
import scaleToDto from "scales/symbolic/chromatic/caching/toDto";

export function toDto(obj: Key): Dto {
  return [pitchToDto(obj.root), scaleToDto(obj.scale)];
}
