import { Pitch } from "pitches/chromatic";
import { Pitches } from "pitches/chromatic";

export type Dto = {
  pitch: Pitch;
  octave: number;
 };

export function hashDto(dto: Dto): string {
  return `(${Pitches.hash(dto.pitch)})|${dto.octave}`;
}
