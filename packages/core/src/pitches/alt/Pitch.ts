/* eslint-disable import/no-cycle */
/* eslint-disable accessor-pairs */
import type { Pitch as DPitch } from "../diatonic";
import type { Key } from "./caching/cache";
import type { OctavePitch } from "../OctavePitch";
import type { Pitch as CPitch } from "chromatic";
import type { Interval } from "intervals/symbolic/alt";
import { inspect } from "node:util";
import { deepFreeze } from "datils/datatypes/objects";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as P } from ".";

export class Pitch implements OctavePitch<Interval> {
  diatonic: DPitch;

  alts: number;

  private constructor(key: Key) {
    this.diatonic = key.diatonic;
    this.alts = key.alts;

    deepFreeze(this);
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

  withShifted(interval: Interval): Pitch {
    return P.shift(this, interval);
  }

  withShiftedDown(interval: Interval): Pitch {
    return P.shiftDown(this, interval);
  }

  get [Symbol.toStringTag](): string {
    return "Pitch";
  }

  [inspect.custom](): string {
    return `${this[Symbol.toStringTag]}(${this.toString()})`;
  }
}
