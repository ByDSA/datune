import type { Key } from "./caching/cache";
import type { Scale as IScale } from "../../Scale";
import type { DegreeArray, Degree } from "degrees/chromatic";
import type { Interval } from "intervals/chromatic";
import { Scale as AScale, Scales as AS } from "scales/alt";
import { stringifyDegree } from "degrees/chromatic/stringify";
import { mode } from "./modifiers";
import { calcIntraIntervals } from "./modifiers/intraIntervals";

export class Scale implements IScale<Interval, Degree> {
  #intraIntervals?: Readonly<DegreeArray>;

  degrees: Readonly<DegreeArray>;

  length: number;

  #string?: string;

  private constructor(key: Key) {
    this.degrees = Object.freeze(key);
    this.length = this.degrees.length;
  }

  [Symbol.iterator](): Iterator<Degree, any, any> {
    return this.degrees[Symbol.iterator]();
  }

  hasDegrees(...degrees: DegreeArray): boolean {
    return degrees.every(i=>this.degrees.includes(i));
  }

  withMode(n: number = 2): Scale {
    return mode(this, n);
  }

  // eslint-disable-next-line accessor-pairs
  get intraIntervals(): Readonly<DegreeArray> {
    if (this.#intraIntervals === undefined)
      this.#intraIntervals = Object.freeze(calcIntraIntervals(this));

    return this.#intraIntervals;
  }

  toAltScale(): AScale {
    return AS.fromChromaticScale(this);
  }

  toString(): string {
    if (this.#string === undefined)
      this.#string = this.degrees.map(stringifyDegree).join("-");

    return this.#string;
  }
}
