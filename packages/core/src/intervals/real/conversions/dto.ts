import { Dto } from "../building/dto";
import Interval from "../Interval";

export default function dto(obj: Interval): Dto {
  return obj.ratio;
}
