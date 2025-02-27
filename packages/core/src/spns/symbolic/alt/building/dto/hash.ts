import Dto from "./Dto";
import { Pitches } from "pitches/alt";

export default function hash(dto: Dto): string {
  return `(${Pitches.hash(dto.pitch)})|${dto.octave}`;
}
