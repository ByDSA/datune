import type { Key } from "./caching/cache";
import { lockr } from "datils/datatypes";
import { Intervals as I } from "intervals/alt";
import { fromAltDegree } from "degrees/chromatic/building";
import { Degree as DiatonicDegree } from "degrees/diatonic";

export class Degree {
  diatonicDegree: DiatonicDegree;

  alts: number;

  private constructor(key: Key) {
    this.diatonicDegree = key.diatonicDegree;
    this.alts = key.alts;

    lockr(this);
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
