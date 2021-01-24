import { mod } from "@datune/utils";
import { Chromatic } from "../../../../pitches";
import { DegreeAlt, DegreeAltArray } from "../../alt/degreealt/DegreeAlt";
import { ScaleAlt } from "../../alt/scalealt/ScaleAlt";
import { DiatonicDegree } from "../../degrees/DiatonicDegree";
import { Scale } from "../scale/Scale";

type Reparam = (i: number, acc: number) => DegreeAlt;
export class ScaleAltConversor {
    constructor(private _scale: Scale) {
    }

    static from(Scale: Scale): ScaleAltConversor {
        return new ScaleAltConversor(Scale);
    }

    private static sevenReparam(i: number, semis: number): DegreeAlt {
        let diatonicDegree = DiatonicDegree.fromInt(i - 1);
        return DegreeAlt.fromDegrees(diatonicDegree, semis);
    }

    private static defaultReparam(i: number, semis: number): DegreeAlt {
        semis = mod(semis, Chromatic.NUMBER);
        switch (semis) {
            case 0: return DegreeAlt.I;
            case 1: return DegreeAlt.from(DiatonicDegree.I, 1);
            case 2: return DegreeAlt.II;
            case 3: return DegreeAlt.from(DiatonicDegree.II, 1);
            case 4: return DegreeAlt.III;
            case 5: return DegreeAlt.IV;
            case 6: return DegreeAlt.from(DiatonicDegree.IV, 1);
            case 7: return DegreeAlt.V;
            case 8: return DegreeAlt.from(DiatonicDegree.V, 1);
            case 9: return DegreeAlt.VI;
            case 10: return DegreeAlt.from(DiatonicDegree.VI, 1);
            case 11: return DegreeAlt.VII;
        }

        throw new Error();
    }

    private static fromIntervals7(d1: number, d2: number, d3: number, d4: number, d5: number, d6: number, d7: number): ScaleAlt {
        let degrees = this.intervals2Degrees([d1, d2, d3, d4, d5, d6, d7], this.sevenReparam);
        let scale = ScaleAlt.fromDegrees(...degrees);
        if (!Object.isFrozen((<any>scale)._precalcDegrees)) {
            (<any>scale)._precalcDegrees = degrees;
            Object.freeze((<any>scale)._precalcDegrees);
        }

        return scale;
    }

    private static intervals2Degrees(distances: number[], reparametrizer: Reparam = this.defaultReparam): DegreeAltArray {
        let degrees: DegreeAltArray = [DegreeAlt.I];
        let distancesAcc = 0;
        for (let i = 2; i <= distances.length; i++) {
            distancesAcc += distances[i - 2];
            let iFixed: number = reparametrizer(i, distancesAcc).diatonicDegree.valueOf();
            let diatonicDegree = DiatonicDegree.fromInt(iFixed);
            let alts = distancesAcc - ScaleAlt.MAJOR.degrees[iFixed].degree;
            let degree: DegreeAlt = DegreeAlt.from(diatonicDegree, alts);
            degrees.push(degree);
        }

        return degrees;
    }

    get scaleDiatonicAlt(): ScaleAlt {
        let ic: number[] = this._scale.intraIntervals;

        if (this._scale.length == 7) {
            return ScaleAltConversor.fromIntervals7(ic[0], ic[1], ic[2], ic[3], ic[4], ic[5], ic[6]);
        } else {
            let degrees: DegreeAltArray = ScaleAltConversor.intervals2Degrees(ic);
            return ScaleAlt.fromDegrees(...degrees);
        }
    }
}