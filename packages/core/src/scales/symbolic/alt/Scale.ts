import { lockr } from "@datune/utils/immutables";
import { Scale as IScale } from "../../Scale";
import type { Dto } from "./caching/Dto";
import { calcIntraIntervals } from "./modifiers/intraIntervals";
import { DegreeArray, Degree, Degrees } from "degrees/alt";
import type { Interval } from "intervals/alt";
import { Voicings } from "voicings/alt";

export class Scale implements IScale<Interval, Degree> {
  private intraIntervals: Dto;

  rootIntervals: Dto;

  degrees: DegreeArray;

  length: number;

  private constructor(dto: Dto) {
    this.intraIntervals = dto;
    this.length = this.intraIntervals.length;
    const voicing = Voicings.fromIntraIntervals(...this.intraIntervals) as any;

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
        if (Degrees.toChromaticDegree(scaleDegree) === Degrees.toChromaticDegree(degree)) {
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
  const ret: DegreeArray = [Degrees.I];
  const intraIntervals = calcIntraIntervals(obj);

  for (let i = 0; i < intraIntervals.length - 1; i++) {
    const interval = intraIntervals[i];
    const diatonicAltDegree = Degrees.add(ret[ret.length - 1], interval);

    ret.push(diatonicAltDegree);
  }

  return ret;
}
