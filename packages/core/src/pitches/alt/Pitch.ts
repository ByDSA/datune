import type { Pitch as DPitch } from "../diatonic";
import type { Key } from "./caching/cache";
import type { OctavePitch } from "../OctavePitch";
import type { Pitch as CPitch } from "chromatic";
import { lockr } from "datils/datatypes";
import { Pitches as CP } from "pitches/chromatic";

export class Pitch implements OctavePitch {
  diatonic: DPitch;

  alts: number;

  private constructor(key: Key) {
    this.diatonic = key.diatonic;
    this.alts = key.alts;

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
