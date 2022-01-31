import { lockr } from "@datune/utils/immutables";
import { Degree as DiatonicDegree } from "degrees/diatonic";
import Dto from "./building/dto/Dto";
import { toChromatic as innerToChromatic } from "./utils";

export default class DegreeAlt {
  diatonicDegree: DiatonicDegree;

  alts: number;

  private constructor(dto: Dto) {
    this.diatonicDegree = dto.diatonicDegree;
    this.alts = dto.alts;

    lockr(this);
  }

  private static create(dto: Dto): DegreeAlt {
    return new DegreeAlt(dto);
  }

  valueOf(): number {
    return innerToChromatic(this.diatonicDegree, this.alts);
  }

  toString(): string {
    if (this.alts === 0)
      return this.diatonicDegree.toString();

    return `${this.diatonicDegree} ${this.alts}`;
  }
}
