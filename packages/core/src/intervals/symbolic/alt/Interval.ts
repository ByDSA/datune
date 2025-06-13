/* eslint-disable import/no-cycle */
import type { Interval as DInterval } from "../diatonic";
import type { Quality } from "./quality/Quality";
import type { Key } from "./caching/cache";
import type { Degree } from "alt";
import { deepFreeze } from "datils/datatypes/objects";
import { Intervals as CI } from "intervals/chromatic";
import { IInterval } from "../IInterval";
import { isMainInterval } from "../diatonic/isMainInterval";
import { toInt } from "./quality/conversions";
import { Intervals as I } from ".";

export class Interval implements IInterval<Degree> {
  diatonicInterval: DInterval;

  quality: Quality;

  #alts?: number;

  private constructor(key: Key) {
    this.diatonicInterval = key.diatonicInterval;
    this.quality = key.quality;
    deepFreeze(this);
  }

  withShifted(interval: Interval): Interval {
    return I.shift(this, interval);
  }

  withShiftedDown(interval: Interval): Interval {
    return I.shiftDown(this, interval);
  }

  withNeg(): Interval {
    return I.neg(this);
  }

  withAbs(): Interval {
    return I.abs(this);
  }

  withSimplified(): Interval {
    return I.simplify(this);
  }

  withCyclicOctave(): Interval {
    return I.cyclicOctave(this);
  }

  toDegree(): Degree {
    return I.degree(this);
  }

  // eslint-disable-next-line accessor-pairs
  get alts(): number {
    if (this.#alts === undefined) {
      const ret = toInt(this.quality, isMainInterval(this.diatonicInterval));

      if (ret === null)
        throw new Error("alts is null");

      this.#alts = ret;
    }

    return this.#alts;
  }

  toString() {
    const dIntervalIntAbs = Math.abs(+this.diatonicInterval);
    const sign = this.diatonicInterval.direction === 0 ? "" : "-";

    return `${sign}${this.quality}${dIntervalIntAbs + 1}`;
  }

  valueOf() {
    return this.toChromaticInterval();
  }

  toChromaticInterval() {
    return CI.fromAltInterval(this);
  }

  toChromaticDegree() {
    return CI.cyclicOctave(CI.fromAltInterval(this));
  }
}
