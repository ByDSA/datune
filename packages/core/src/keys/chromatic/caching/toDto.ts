import pitchToDto from "pitches/chromatic/caching/toDto";
import scaleToDto from "scales/symbolic/chromatic/caching/toDto";
import Key from "../Key";
import Dto from "./Dto";

export default function toDto(obj: Key): Dto {
  return [pitchToDto(obj.root), scaleToDto(obj.scale)];
}
