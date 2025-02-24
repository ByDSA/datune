import { hash as intervalHash } from "intervals/real";
import Dto from "./Dto";

export default function hash(dto: Dto): string {
  return dto.map(intervalHash).join("-");
}
