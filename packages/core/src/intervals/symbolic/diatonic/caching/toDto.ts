import { Interval } from "..";
import Dto from "./Dto";

export default function toDto(obj: Interval): Dto {
  return {
    magnitude: obj.magnitude,
    direction: obj.direction,
  };
}
