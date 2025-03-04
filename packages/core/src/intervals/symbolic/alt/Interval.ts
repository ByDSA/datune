import type { Interval as DInterval } from "../diatonic";
import type { Quality } from "./quality/Quality";
import type { Dto } from "./caching/Dto";
import { lockr } from "@datune/utils/immutables";

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
    const diatonicIntervalInt = +this.diatonicInterval;
    const diatonicIntervalIntAbs = Math.abs(diatonicIntervalInt);
    const sign = this.diatonicInterval.direction === 0 ? "" : "-";

    return `${sign}${this.quality}${diatonicIntervalIntAbs + 1}`;
  }
}
