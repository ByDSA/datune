import type { Interval as DInterval } from "../diatonic";
import type { Quality } from "./quality/Quality";
import type { Key } from "./caching/cache";
import { lockr } from "datils/datatypes";
import { Intervals as CI } from "intervals/chromatic";
import { Degrees as D } from "degrees/alt";

export class Interval {
  diatonicInterval: DInterval;

  quality: Quality;

  private constructor(key: Key) {
    this.diatonicInterval = key.diatonicInterval;
    this.quality = key.quality;
    lockr(this);
  }

  toString() {
    const dIntervalIntAbs = Math.abs(+this.diatonicInterval);
    const sign = this.diatonicInterval.direction === 0 ? "" : "-";

    return `${sign}${this.quality}${dIntervalIntAbs + 1}`;
  }

  toChromaticInterval() {
    return CI.fromAltInterval(this);
  }

  toDegree() {
    return D.fromInterval(this);
  }
}
