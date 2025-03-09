import type { Pitch } from "pitches/alt";
import { hash as hashPitch } from "pitches/alt/caching/hash";

export type Dto = { pitch: Pitch;
octave: number; };

export function hashDto(dto: Dto): string {
  return `(${hashPitch(dto.pitch)})|${dto.octave}`;
}
