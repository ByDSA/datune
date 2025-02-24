import Scale from "../Scale";
import Dto from "./Dto";

export default function dto(obj: Scale): Dto {
  return obj.rootIntervals;
}
