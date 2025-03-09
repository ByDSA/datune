import type { Pitch as DPitch } from "../diatonic";
import type { Dto } from "./caching/Dto";
import type { OctavePitch } from "../OctavePitch";
import type { Pitch as CPitch } from "chromatic";
import { lockr } from "@datune/utils/immutables";
import { Pitches as CP } from "pitches/chromatic";

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

  toChromatic(): CPitch {
    return CP.fromAltPitch(this);
  }

  toString(): string {
    if (this.alts >= 0)
      return `${this.diatonic}${"♯".repeat(this.alts)}`;

    return `${this.diatonic}${"♭".repeat(-this.alts)}`;
  }
}
