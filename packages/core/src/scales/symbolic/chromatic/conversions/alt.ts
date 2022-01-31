import { cyclicMod } from "@datune/utils";
import { Array as DegreeAltArray, Degree as DegreeAlt, from, fromDegrees as altFromDegrees, I, II, III, IV, V, VI, VII } from "degrees/alt";
import { Degree as ChromaticDegree } from "degrees/chromatic";
import { fromInt as diatonicDegreeFromInt, I as D_I, II as D_II, IV as D_IV, V as D_V, VI as D_VI } from "degrees/diatonic";
import { calcAlts } from "pitches/alt";
import { NUMBER as C_NUMBER } from "pitches/chromatic";
import { fromDegrees as scaleAltFromDegrees, Scale as ScaleAlt } from "scales/alt";
import { calcIntraIntervals } from "../modifiers";
import Scale from "../Scale";

type Reparam = (i: number, acc: number)=> DegreeAlt;
class ScaleAltConversor {
  private _scale: Scale;

  constructor(scale: Scale) {
    this._scale = scale;
  }

  static from(scale: Scale): ScaleAltConversor {
    return new ScaleAltConversor(scale);
  }

  private static sevenReparam(i: number, semis: number): DegreeAlt {
    const diatonicDegree = diatonicDegreeFromInt(i - 1);

    return altFromDegrees(diatonicDegree, semis as ChromaticDegree);
  }

  private static defaultReparam(i: number, semis: number): DegreeAlt {
    const fixedSemis = cyclicMod(semis, C_NUMBER);

    switch (fixedSemis) {
      case 0: return I;
      case 1: return from(D_I, 1);
      case 2: return II;
      case 3: return from(D_II, 1);
      case 4: return III;
      case 5: return IV;
      case 6: return from(D_IV, 1);
      case 7: return V;
      case 8: return from(D_V, 1);
      case 9: return VI;
      case 10: return from(D_VI, 1);
      case 11: return VII;
      default: throw new Error();
    }
  }

  private static fromIntervals7(
    d1: number,
    d2: number,
    d3: number,
    d4: number,
    d5: number,
    d6: number,
    d7: number,
  ): ScaleAlt {
    const degrees = this.intervals2Degrees([d1, d2, d3, d4, d5, d6, d7], this.sevenReparam);
    const scale = scaleAltFromDegrees(...degrees);

    return scale;
  }

  private static intervals2Degrees(
    distances: number[],
    reparametrizer: Reparam = this.defaultReparam,
  ): DegreeAltArray {
    const degrees: DegreeAltArray = [I];
    let distancesAcc = 0;

    for (let i = 2; i <= distances.length; i++) {
      distancesAcc += distances[i - 2];
      const iFixed: number = reparametrizer(i, distancesAcc).diatonicDegree.valueOf();
      const diatonicDegree = diatonicDegreeFromInt(iFixed);
      const alts = calcAlts(distancesAcc, diatonicDegree);
      const degree: DegreeAlt = from(diatonicDegree, alts);

      degrees.push(degree);
    }

    return degrees;
  }

  // eslint-disable-next-line accessor-pairs
  get scaleDiatonicAlt(): ScaleAlt {
    const ic: number[] = calcIntraIntervals(this._scale);

    if (this._scale.length === 7)
      return ScaleAltConversor.fromIntervals7(ic[0], ic[1], ic[2], ic[3], ic[4], ic[5], ic[6]);

    const degrees: DegreeAltArray = ScaleAltConversor.intervals2Degrees(ic);

    return scaleAltFromDegrees(...degrees);
  }
}

export default function alt(scale: Scale): ScaleAlt {
  return ScaleAltConversor.from(scale).scaleDiatonicAlt;
}
