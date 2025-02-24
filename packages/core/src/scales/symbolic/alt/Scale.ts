import { lockr } from "@datune/utils/immutables";
import { add, Array as DegreeArray, Degree, I, toChromaticDegree } from "degrees/alt";
import { Interval } from "intervals/alt";
import { fromIntraIntervals as DAVFromIntraIntervals } from "voicings/alt";
import IScale from "../../Scale";
import { Dto } from "./caching";
import { calcIntraIntervals } from "./modifiers";

export default class Scale implements IScale<Interval, Degree> {
  private intraIntervals: Dto;

  rootIntervals: Dto;

  degrees: DegreeArray;

  length: number;

  private constructor(dto: Dto) {
    this.intraIntervals = dto;
    this.length = this.intraIntervals.length;
    const voicing = DAVFromIntraIntervals(...this.intraIntervals) as any;

    this.rootIntervals = voicing.rootIntervals;
    this.degrees = calcDegrees(this);

    lockr(this);
  }

  private static create(dto: Dto): Scale {
    return new Scale(dto);
  }

  hasEnharmonicDegrees(...degrees: DegreeArray): boolean {
    for (const degree of degrees) {
      let found = false;

      for (const scaleDegree of this.degrees) {
        if (toChromaticDegree(scaleDegree) === toChromaticDegree(degree)) {
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
  const ret: DegreeArray = [I];
  const intraIntervals = calcIntraIntervals(obj);

  for (let i = 0; i < intraIntervals.length - 1; i++) {
    const interval = intraIntervals[i];
    const diatonicAltDegree = add(ret[ret.length - 1], interval);

    ret.push(diatonicAltDegree);
  }

  return ret;
}
