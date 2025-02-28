import { cyclicMod } from "@datune/utils";
import { calcIntraIntervals } from "../modifiers";
import { Scale } from "../Scale";
import { DegreeArray as DegreeAltArray, Degree as DegreeAlt, Degrees as DegreeAlts } from "degrees/alt";
import { Degree as ChromaticDegree } from "degrees/chromatic";
import { Degrees as DDegrees } from "degrees/diatonic";
import { Pitches as AltPitches } from "pitches/alt";
import { Pitches as CPitches } from "pitches/chromatic";
import { Scales as ScalesAlt, Scale as ScaleAlt } from "scales/alt";

type Reparam = (i: number, acc: number)=> DegreeAlt;
class ScaleAltConversor {
  #scale: Scale;

  constructor(scale: Scale) {
    this.#scale = scale;
  }

  static from(scale: Scale): ScaleAltConversor {
    return new ScaleAltConversor(scale);
  }

  private static sevenReparam(i: number, semis: number): DegreeAlt {
    const diatonicDegree = DDegrees.fromInt(i - 1);

    return DegreeAlts.fromDegrees(diatonicDegree, semis as ChromaticDegree);
  }

  private static defaultReparam(_i: number, semis: number): DegreeAlt {
    const fixedSemis = cyclicMod(semis, CPitches.NUMBER);

    switch (fixedSemis) {
      case 0: return DegreeAlts.I;
      case 1: return DegreeAlts.from(DDegrees.I, 1);
      case 2: return DegreeAlts.II;
      case 3: return DegreeAlts.from(DDegrees.II, 1);
      case 4: return DegreeAlts.III;
      case 5: return DegreeAlts.IV;
      case 6: return DegreeAlts.from(DDegrees.IV, 1);
      case 7: return DegreeAlts.V;
      case 8: return DegreeAlts.from(DDegrees.V, 1);
      case 9: return DegreeAlts.VI;
      case 10: return DegreeAlts.from(DDegrees.VI, 1);
      case 11: return DegreeAlts.VII;
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
    const scale = ScalesAlt.fromDegrees(...degrees);

    return scale;
  }

  private static intervals2Degrees(
    distances: number[],
    reparametrizer: Reparam = this.defaultReparam,
  ): DegreeAltArray {
    const degrees: DegreeAltArray = [DegreeAlts.I];
    let distancesAcc = 0;

    for (let i = 2; i <= distances.length; i++) {
      distancesAcc += distances[i - 2];
      const iFixed: number = reparametrizer(i, distancesAcc).diatonicDegree.valueOf();
      const diatonicDegree = DDegrees.fromInt(iFixed);
      const alts = AltPitches.calcAlts(distancesAcc, diatonicDegree);
      const degree: DegreeAlt = DegreeAlts.from(diatonicDegree, alts);

      degrees.push(degree);
    }

    return degrees;
  }

  // eslint-disable-next-line accessor-pairs
  get scaleDiatonicAlt(): ScaleAlt {
    const ic: number[] = calcIntraIntervals(this.#scale);

    if (this.#scale.length === 7)
      return ScaleAltConversor.fromIntervals7(ic[0], ic[1], ic[2], ic[3], ic[4], ic[5], ic[6]);

    const degrees: DegreeAltArray = ScaleAltConversor.intervals2Degrees(ic);

    return ScalesAlt.fromDegrees(...degrees);
  }
}

export function toAlt(scale: Scale): ScaleAlt {
  return ScaleAltConversor.from(scale).scaleDiatonicAlt;
}
