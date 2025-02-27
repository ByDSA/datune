import type ConcertPitch from "../ConcertPitch";
import type { SPN } from "spns/chromatic";
import { hashDto as hashSPNDto } from "spns/symbolic/chromatic/building/dto/Dto";

export type Dto = {
  frequency: number;
  spn: SPN;
};

export function hashDto(dto: Dto): string {
  const absPitchHashCode = hashSPNDto(dto.spn);

  return `${absPitchHashCode}:${dto.frequency}`;
}

export function hash(obj: ConcertPitch): string {
  return hashDto(obj);
}
