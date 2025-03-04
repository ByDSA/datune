import type { Dto } from "./Dto";
import { Key } from "../../Key";

export function toDto(obj: Key): Dto {
  return {
    root: obj.root,
    scale: obj.scale,
  };
}
