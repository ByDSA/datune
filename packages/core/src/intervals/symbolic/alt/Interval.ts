import { lockr } from "@datune/utils/immutables";
import { Interval as Diatonic } from "../diatonic";
import { Quality } from "../quality";
import { Dto } from "./caching";

export default class Interval {
  diatonicInterval: Diatonic;

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
    const sign = diatonicIntervalInt >= 0 ? "" : "-";

    return `${sign}${this.quality}${diatonicIntervalIntAbs + 1}`;
  }
}
