import { Dto } from "../building";
import Key from "../Key";

export default function toDto(obj: Key): Dto {
  return {
    root: obj.root,
    scale: obj.scale,
  };
}
