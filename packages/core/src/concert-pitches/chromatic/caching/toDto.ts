import type ConcertPitch from "../ConcertPitch";
import { Dto } from "./Dto";

export function toDto(obj: ConcertPitch): Dto {
  return {
    frequency: obj.frequency,
    spn: obj.spn,
  };
}
