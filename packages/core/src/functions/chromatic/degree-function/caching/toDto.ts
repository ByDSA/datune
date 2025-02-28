import type { DegreeFunction } from "../DegreeFunction";
import type { Dto } from "./Dto";

export function toDto(obj: DegreeFunction): Dto {
  return {
    degree: obj.degree,
    voicing: obj.voicing,
  };
}
