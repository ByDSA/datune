import type { Interval as DInterval } from "../diatonic";
import type { Quality } from "./quality/Quality";
import type { Dto } from "./caching/Dto";
import { lockr } from "@datune/utils/immutables";
import { Intervals as CI } from "intervals/chromatic";
import { Degrees as D } from "degrees/alt";

export class Interval {
  diatonicInterval: DInterval;

  quality: Quality;

  private constructor(dto: Dto) {
    this.diatonicInterval = dto.diatonicInterval;
    this.quality = dto.quality;
    lockr(this);
  }

  private static create(dto: Dto): Interval {
    return new Interval(dto);
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
