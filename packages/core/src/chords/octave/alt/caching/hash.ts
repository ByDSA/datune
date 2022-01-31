import { hash as pitchHash } from "pitches/alt";
import Dto from "./Dto";

export default function hash(dto: Dto): string {
  return dto.map(pitchHash).join("-");
}
