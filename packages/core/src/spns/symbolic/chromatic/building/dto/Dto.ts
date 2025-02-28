import type { Pitch } from "pitches/chromatic";
import { hash as hashPitch } from "pitches/chromatic/caching/hash";

export type Dto = {
  pitch: Pitch;
  octave: number;
 };

export function hashDto(dto: Dto): string {
  return `(${hashPitch(dto.pitch)})|${dto.octave}`;
}
