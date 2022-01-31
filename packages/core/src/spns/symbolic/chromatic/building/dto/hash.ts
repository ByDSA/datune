import { hash as dtoHash } from "pitches/chromatic";
import Dto from "./Dto";

export default function hash(dto: Dto): string {
  return `(${dtoHash(dto.pitch)})|${dto.octave}`;
}
