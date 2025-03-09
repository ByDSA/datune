import type { Dto } from "./caching/Dto";
import { lockr } from "@datune/utils/immutables";
import { Intervals as I } from "intervals/alt";
import { fromAltDegree } from "degrees/chromatic/building";
import { Degree as DiatonicDegree } from "degrees/diatonic";

export class Degree {
  diatonicDegree: DiatonicDegree;

  alts: number;

  private constructor(dto: Dto) {
    this.diatonicDegree = dto.diatonicDegree;
    this.alts = dto.alts;

    lockr(this);
  }

  private static create(dto: Dto): Degree {
    return new Degree(dto);
  }

  valueOf(): number {
    return fromAltDegree(this);
  }

  toString(): string {
    if (this.alts >= 0)
      return "♯".repeat(this.alts) + this.diatonicDegree.toString();

    return `${"♭".repeat(-this.alts)}${this.diatonicDegree}`;
  }

  toChromatic() {
    return fromAltDegree(this);
  }

  toInterval() {
    return I.fromDegree(this);
  }
}
