import type { Dto } from "./Dto";
import type { SPN } from "../../SPN";

export function toDto(obj: SPN): Dto {
  return {
    pitch: obj.pitch,
    octave: obj.octave,
  };
}
