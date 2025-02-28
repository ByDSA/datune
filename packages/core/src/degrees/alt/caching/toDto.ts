import type { Degree } from "../Degree";
import type { Dto } from "./Dto";

export function toDto(obj: Degree): Dto {
  return {
    diatonicDegree: obj.diatonicDegree,
    alts: obj.alts,
  };
}
