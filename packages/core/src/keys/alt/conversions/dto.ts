import { Dto } from "../building/dto/Dto";
import { Key } from "../Key";

export function toDto(obj: Key): Dto {
  return {
    root: obj.root,
    scale: obj.scale,
  };
}
