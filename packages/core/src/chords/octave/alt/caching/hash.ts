import { Pitches } from "pitches/alt";
import Dto from "./Dto";

export default function hash(dto: Dto): string {
  return dto.map(Pitches.hash).join("-");
}
