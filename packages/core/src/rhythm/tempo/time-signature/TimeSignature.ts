import type { MusicalDuration } from "../musical-duration";
import type { Dto } from "./caching/Dto";
import { lockr } from "@datune/utils/immutables";

export class TimeSignature {
  numerators: number[];

  numerator: number;

  denominator: number;

  denominatorBeat: MusicalDuration;

  private constructor(dto: Dto) {
    this.denominator = musicalDurationToDen(dto.beat);
    this.denominatorBeat = dto.beat;
    this.numerators = dto.nums;
    this.numerator = calcNumerator(this.numerators);

    lockr(this);
  }

  private static create(dto: Dto): TimeSignature {
    return new TimeSignature(dto);
  }
}

function musicalDurationToDen(md: MusicalDuration): number {
  return 1 / +md;
}

function calcNumerator(numerators: number[]): number {
  return numerators.reduce((p, c) => p + c);
}
