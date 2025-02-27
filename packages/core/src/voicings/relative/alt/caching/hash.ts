import { Intervals } from "intervals/alt";
import Dto from "./Dto";

export default function hash(dto: Dto): string {
  return dto.map(Intervals.hash).join("-");
}
