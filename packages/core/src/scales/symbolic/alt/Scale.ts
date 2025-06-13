import type { Key } from "./caching/cache";
import type { Scale as IScale } from "../../Scale";
import type { Interval } from "intervals/alt";
import { type DegreeArray, type Degree } from "degrees/alt";
import { type DegreeArray as CDegreeArray } from "degrees/chromatic";
import { Voicings as V } from "voicings/alt";
import { fromAltInterval } from "intervals/symbolic/chromatic/building/altInterval";
import { Scale as CScale } from "scales/chromatic";
import { Intervals as CI } from "intervals/chromatic";
import { Scales as CS } from "scales/chromatic";
import { stringifyDegree } from "degrees/alt/stringify";
import { mode } from "./modifiers";

export class Scale implements IScale<Interval, Degree> {
  deltaIntervals: Readonly<DegreeArray>;

  degrees: Readonly<DegreeArray>;

  length: number;

  #string?: string;

  private constructor(key: Key) {
    this.deltaIntervals = Object.freeze(key);
    this.length = this.deltaIntervals.length;
    const voicing = V.fromDeltaIntervals(...this.deltaIntervals);

    this.degrees = Object.freeze(voicing.rootIntervals.map(i=>i.toDegree()) as DegreeArray);
  }

  [Symbol.iterator](): Iterator<Degree, any, any> {
    return this.degrees[Symbol.iterator]();
  }

  withMode(n: number = 2): Scale {
    return mode(this, n);
  }

  hasDegrees(...degrees: DegreeArray): boolean {
    return degrees.every(i=>this.degrees.includes(i));
  }

  toChromaticScale(): CScale {
    const cDegrees = this.degrees.map(i=>CI.fromAltInterval(i)) as CDegreeArray;

    return CS.fromDegrees(...cDegrees);
  }

  hasChromaticDegrees(...cDegrees: CDegreeArray): boolean {
    for (const d of cDegrees) {
      let found = false;

      for (const scaleDegree of this.degrees) {
        if (fromAltInterval(scaleDegree) === d) {
          found = true;
          break;
        }
      }

      if (!found)
        return false;
    }

    return true;
  }

  toString() {
    if (this.#string === undefined)
      this.#string = this.degrees.map(stringifyDegree).join("-");

    return this.#string;
  }
}
