import { lockr } from "@datune/utils/immutables";
import { Pitch as Diatonic } from "../diatonic";
import OctavePitch from "../OctavePitch";
import { Dto } from "./caching";

export default class Pitch implements OctavePitch {
  diatonic: Diatonic;

  alts: number;

  private constructor(dto: Dto) {
    this.diatonic = dto.diatonic;
    this.alts = dto.alts;

    lockr(this);
  }

  valueOf(): number {
    return +this.diatonic * 11 + this.alts * 17;
  }

  toString(): string {
    if (this.alts === 0)
      return this.diatonic.toString();

    return `${this.diatonic}(${this.alts})`;
  }
}
