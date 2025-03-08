import type { Dto } from "./caching/Dto";
import { lockr } from "@datune/utils/immutables";
import { Degree as DiatonicDegree } from "degrees/diatonic";
import { toChromatic as innerToChromatic } from "./utils";

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
    return innerToChromatic(this.diatonicDegree, this.alts);
  }

  toString(): string {
    if (this.alts >= 0)
      return "#".repeat(this.alts) + this.diatonicDegree.toString();

    return `${"b".repeat(-this.alts)}${this.diatonicDegree}`;
  }
}
