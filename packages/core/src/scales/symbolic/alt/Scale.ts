import type { Key } from "./caching/cache";
import type { Scale as IScale } from "../../Scale";
import type { IntervalArray as CIntervalArray } from "intervals/chromatic";
import type { IntervalArray, Interval } from "intervals/alt";
import { deepFreeze } from "datils/datatypes/objects";
import { type DegreeArray, type Degree, Degrees as D } from "degrees/alt";
import { Intervals } from "intervals/symbolic/alt";
import { Voicings as V } from "voicings/alt";
import { fromAltInterval } from "intervals/symbolic/chromatic/building/altInterval";
import { Scale as CScale } from "scales/chromatic";
import { Intervals as CI } from "intervals/chromatic";
import { Scales as CS } from "scales/chromatic";
import { calcIntraIntervals } from "./modifiers/intraIntervals";

export class Scale implements IScale<Interval, Degree> {
  private intraIntervals: IntervalArray;

  rootIntervals: IntervalArray;

  degrees: DegreeArray;

  length: number;

  private constructor(key: Key) {
    this.intraIntervals = key;
    this.length = this.intraIntervals.length;
    const voicing = V.fromIntraIntervals(...this.intraIntervals) as any;

    this.rootIntervals = voicing.rootIntervals;
    this.degrees = calcDegrees(this);

    deepFreeze(this);
  }

  [Symbol.iterator](): Iterator<Interval, any, any> {
    return this.rootIntervals[Symbol.iterator]();
  }

  toChromatic(): CScale {
    const rootcIntervals = this.rootIntervals.map(i=>CI.fromAltInterval(i)) as CIntervalArray;

    return CS.fromRootIntervals(...rootcIntervals);
  }

  hasEnharmonicDegrees(...degrees: DegreeArray): boolean {
    for (const degree of degrees) {
      let found = false;

      for (const scaleDegree of this.degrees) {
        if (fromAltInterval(scaleDegree) === fromAltInterval(degree)) {
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
    return this.rootIntervals.map(String).join("-");
  }
}

function calcDegrees(obj: Scale): DegreeArray {
  const ret: DegreeArray = [D.I];
  const intraIntervals = calcIntraIntervals(obj);

  for (let i = 0; i < intraIntervals.length - 1; i++) {
    const interval = intraIntervals[i];
    const degree = Intervals.shift(ret[ret.length - 1], interval);

    ret.push(degree);
  }

  return ret;
}
