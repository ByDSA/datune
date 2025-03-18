import type { Scale } from "../../chromatic/Scale";
import { cyclicMod } from "datils/math";
import { Degree as ChromaticDegree } from "degrees/chromatic";
import { Degrees as DDegrees } from "degrees/diatonic";
import { calcAlts } from "pitches/alt/calcAlts";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants/Number";
import { Scales as AS, Scale as AScale } from "scales/alt";
import { DegreeArray as ADegreeArray, Degree as ADegree, Degrees as AD } from "degrees/alt";
import { calcIntraIntervals } from "../../chromatic/modifiers/intraIntervals";

;

type Reparam = (i: number, acc: number)=> ADegree;
class ScaleAltConversor {
  #scale: Scale;

  constructor(scale: Scale) {
    this.#scale = scale;
  }

  static from(scale: Scale): ScaleAltConversor {
    return new ScaleAltConversor(scale);
  }

  private static sevenReparam(i: number, semis: number): ADegree {
    const diatonicDegree = DDegrees.fromInt(i - 1);

    return AD.fromDegrees(diatonicDegree, semis as ChromaticDegree);
  }

  private static defaultReparam(_i: number, semis: number): ADegree {
    const fixedSemis = cyclicMod(semis, CNUMBER);

    switch (fixedSemis) {
      case 0: return AD.I;
      case 1: return AD.from(DDegrees.I, 1);
      case 2: return AD.II;
      case 3: return AD.from(DDegrees.II, 1);
      case 4: return AD.III;
      case 5: return AD.IV;
      case 6: return AD.from(DDegrees.IV, 1);
      case 7: return AD.V;
      case 8: return AD.from(DDegrees.V, 1);
      case 9: return AD.VI;
      case 10: return AD.from(DDegrees.VI, 1);
      case 11: return AD.VII;
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
  ): AScale {
    const degrees = this.intervals2Degrees([d1, d2, d3, d4, d5, d6, d7], this.sevenReparam);
    const scale = AS.fromDegrees(...degrees);

    return scale;
  }

  private static intervals2Degrees(
    distances: number[],
    reparametrizer: Reparam = this.defaultReparam,
  ): ADegreeArray {
    const degrees: ADegreeArray = [AD.I];
    let distancesAcc = 0;

    for (let i = 2; i <= distances.length; i++) {
      distancesAcc += distances[i - 2];
      const iFixed: number = reparametrizer(i, distancesAcc).diatonicDegree.valueOf();
      const diatonicDegree = DDegrees.fromInt(iFixed);
      const alts = calcAlts(distancesAcc, diatonicDegree);
      const degree: ADegree = AD.from(diatonicDegree, alts);

      degrees.push(degree);
    }

    return degrees;
  }

  // eslint-disable-next-line accessor-pairs
  get scaleDiatonicAlt(): AScale {
    const ic: number[] = calcIntraIntervals(this.#scale);

    if (this.#scale.length === 7)
      return ScaleAltConversor.fromIntervals7(ic[0], ic[1], ic[2], ic[3], ic[4], ic[5], ic[6]);

    const degrees: ADegreeArray = ScaleAltConversor.intervals2Degrees(ic);

    return AS.fromDegrees(...degrees);
  }
}

export function fromChromaticScale(scale: Scale): AScale {
  return ScaleAltConversor.from(scale).scaleDiatonicAlt;
}
