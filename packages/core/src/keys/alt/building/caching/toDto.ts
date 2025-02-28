import { Key } from "../../Key";
import type { Dto } from "./Dto";

export function toDto(obj: Key): Dto {
  return {
    root: obj.root,
    scale: obj.scale,
  };
}
