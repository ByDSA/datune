import type { Dto } from "../building/dto/Dto";
import type { SPN } from "../SPN";

export function toDto(obj: SPN): Dto {
  return {
    pitch: obj.pitch,
    octave: obj.octave,
  };
}
