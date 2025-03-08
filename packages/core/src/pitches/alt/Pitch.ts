import type { Pitch as DPitch } from "../diatonic";
import type { Dto } from "./caching/Dto";
import type { OctavePitch } from "../OctavePitch";
import { lockr } from "@datune/utils/immutables";

export class Pitch implements OctavePitch {
  diatonic: DPitch;

  alts: number;

  private constructor(dto: Dto) {
    this.diatonic = dto.diatonic;
    this.alts = dto.alts;

    lockr(this);
  }

  valueOf(): number {
    return (+this.diatonic * 11) + (this.alts * 17);
  }

  toString(): string {
    if (this.alts >= 0)
      return `${this.diatonic}${"♯".repeat(this.alts)}`;

    return `${this.diatonic}${"♭".repeat(-this.alts)}`;
  }
}
