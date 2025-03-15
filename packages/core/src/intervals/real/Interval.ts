import { NumExp } from "@datune/utils/math";

export class Interval {
  ratio: NumExp;

  private constructor(ratio: NumExp) {
    this.ratio = ratio;
  }

  valueOf() {
    return +this.ratio;
  }

  toString() {
    return String(this.ratio);
  }
}
