import { Dto as PitchDto } from "pitches/chromatic/caching/Dto";
import { Dto as ScaleDto } from "scales/symbolic/chromatic/caching/Dto";

export type Dto = [PitchDto, ScaleDto];

export function hashDto(obj: Dto): string {
  return `${obj[1].join("-")}:${obj[0]}`;
}
