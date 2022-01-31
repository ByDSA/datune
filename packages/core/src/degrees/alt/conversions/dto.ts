import { Dto } from "../building/dto";
import Degree from "../Degree";

export default function toDto(obj: Degree): Dto {
  return {
    diatonicDegree: obj.diatonicDegree,
    alts: obj.alts,
  };
}
