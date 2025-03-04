import type { TimeSignature } from "../TimeSignature";
import type { Dto } from "./Dto";

export function toDto(obj: TimeSignature): Dto {
  return {
    nums: obj.numerators,
    beat: obj.denominatorBeat,
  };
}
