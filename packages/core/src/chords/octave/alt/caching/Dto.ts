import { type PitchArray } from "pitches/alt";
import { hash as hashPitch } from "pitches/alt/caching/hash";

export type Dto = PitchArray;

export function hashDto(dto: Dto): string {
  return dto.map(hashPitch).join("-");
}
