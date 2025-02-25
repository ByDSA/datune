import { hash as dtoHash } from "pitches/alt";
import Dto from "./Dto";

export default function hash(dto: Dto): string {
  return `(${dtoHash(dto.pitch)})|${dto.octave}`;
}
