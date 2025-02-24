import Direction from "../Direction";
import Dto from "./Dto";

export default function hash(obj: Dto): string {
  const dirStr = obj.direction === Direction.ASCENDENT ? "+" : "-";

  return `${dirStr}${obj.magnitude}`;
}
