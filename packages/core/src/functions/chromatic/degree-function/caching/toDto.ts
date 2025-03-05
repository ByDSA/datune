import type { DegreeFunc } from "../DegreeFunc";
import type { Dto } from "./Dto";

export function toDto(obj: DegreeFunc): Dto {
  return {
    degree: obj.degree,
    voicing: obj.voicing,
  };
}
