/* eslint-disable import/no-cycle */
import type { Voicing as IVoicing } from "../Voicing";
import type { Voicing as CVoicing } from "voicings/chromatic";
import type { Voicing as DVoicing } from "voicings/diatonic";
import type { IntervalArray, Interval } from "intervals/alt";
import { deepFreeze } from "datils/datatypes/objects";
import { toChromaticVoicing, toDiatonicVoicing } from "./conversions";
import { Voicings as V } from ".";

export class Voicing implements IVoicing<Interval> {
  rootIntervals: IntervalArray;

  length: number;

  private constructor(key: IntervalArray) {
    this.rootIntervals = key;

    this.length = this.rootIntervals.length;

    deepFreeze(this);
  }

  [Symbol.iterator](): Iterator<Interval> {
    return this.rootIntervals[Symbol.iterator]();
  }

  withAdded(...intervals: Interval[]): Voicing {
    return V.add(this, ...intervals);
  }

  withRemoved(...intervals: Interval[]): Voicing | null {
    return V.remove(this, ...intervals);
  }

  withShifted(interval: Interval): Voicing {
    return V.shift(this, interval);
  }

  withShiftedDown(interval: Interval): Voicing {
    return V.shiftDown(this, interval);
  }

  withInv(n: number = 1): Voicing {
    return V.inv(this, n);
  }

  withClose(): Voicing {
    return V.close(this);
  }

  toChromaticVoicing(): CVoicing {
    return toChromaticVoicing(this);
  }

  toDiatonicVoicing(): DVoicing {
    return toDiatonicVoicing(this);
  }

  toString(): string {
    return this.rootIntervals.map(String).join("-");
  }
}
