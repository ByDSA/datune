import { DegreeFunction } from "../DegreeFunction";
import { Dto } from "./Dto";

export function toDto(obj: DegreeFunction): Dto {
  return {
    degree: obj.degree,
    voicing: obj.voicing,
  };
}
