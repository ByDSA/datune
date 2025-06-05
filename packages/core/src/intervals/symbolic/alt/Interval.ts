/* eslint-disable import/no-cycle */
import type { Interval as DInterval } from "../diatonic";
import type { Quality } from "./quality/Quality";
import type { Key } from "./caching/cache";
import { deepFreeze } from "datils/datatypes/objects";
import { Intervals as CI } from "intervals/chromatic";
import { Degrees as D } from "degrees/alt";
import { IInterval } from "../IInterval";
import { Intervals as I } from ".";

export class Interval implements IInterval {
  diatonicInterval: DInterval;

  quality: Quality;

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

  toDegree() {
    return D.fromInterval(this);
  }
}
