import Interval from "../Interval";
import Dto from "./Dto";

export default function toDto(obj: Interval): Dto {
  return {
    diatonicInterval: obj.diatonicInterval,
    quality: obj.quality,
  };
}
