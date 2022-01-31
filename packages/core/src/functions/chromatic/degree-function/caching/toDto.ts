import DegreeFunction from "../DegreeFunction";
import Dto from "./Dto";

export default function toDto(obj: DegreeFunction): Dto {
  return {
    degree: obj.degree,
    voicing: obj.voicing,
  };
}
