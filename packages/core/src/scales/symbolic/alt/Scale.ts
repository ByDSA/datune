import type { Dto } from "./caching/Dto";
import type { Scale as IScale } from "../../Scale";
import type { DegreeArray, Degree } from "degrees/alt";
import type { IntervalArray as CIntervalArray } from "intervals/chromatic";
import { lockr } from "@datune/utils/immutables";
import { type Interval } from "intervals/alt";
import { Degrees as D } from "degrees/alt";
import { Voicings as V } from "voicings/alt";
import { fromAltDegree } from "degrees/chromatic/building/fromAltDegree";
import { Scale as CScale } from "scales/chromatic";
import { Intervals as CI } from "intervals/chromatic";
import { Scales as CS } from "scales/chromatic";
import { calcIntraIntervals } from "./modifiers/intraIntervals";

export class Scale implements IScale<Interval, Degree> {
  private intraIntervals: Dto;

  rootIntervals: Dto;

  degrees: DegreeArray;

  length: number;

  private constructor(dto: Dto) {
    this.intraIntervals = dto;
    this.length = this.intraIntervals.length;
    const voicing = V.fromIntraIntervals(...this.intraIntervals) as any;

    this.rootIntervals = voicing.rootIntervals;
    this.degrees = calcDegrees(this);

    lockr(this);
  }

  private static create(dto: Dto): Scale {
    return new Scale(dto);
  }

  toChromatic(): CScale {
    const rootcIntervals = this.rootIntervals.map(i=>CI.fromAltInterval(i)) as CIntervalArray;

    return CS.fromRootIntervals(...rootcIntervals);
  }

  hasEnharmonicDegrees(...degrees: DegreeArray): boolean {
    for (const degree of degrees) {
      let found = false;

      for (const scaleDegree of this.degrees) {
        if (fromAltDegree(scaleDegree) === fromAltDegree(degree)) {
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
    const degree = D.add(ret[ret.length - 1], interval);

    ret.push(degree);
  }

  return ret;
}
