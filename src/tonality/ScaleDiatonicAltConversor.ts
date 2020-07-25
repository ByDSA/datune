import { DiatonicAltDegree } from '../degrees/degrees/DiatonicAltDegree';
import { DiatonicDegree } from '../degrees/degrees/DiatonicDegree';
import { Scale } from './Scale';
import { ScaleChromatic } from './ScaleChromatic';

export class ScaleDiatonicAltConversor {
    constructor(private _scaleChromatic: ScaleChromatic) {
    }

    static from(scaleChromatic: ScaleChromatic): ScaleDiatonicAltConversor {
        return new ScaleDiatonicAltConversor(scaleChromatic);
    }

    private static sevenReparam(i: number, semis: number): DiatonicAltDegree {
        let diatonicDegree = DiatonicDegree.fromInt(i - 1);
        return DiatonicAltDegree.fromSemis(diatonicDegree, semis);
    }

    private static defaultReparam(i: number, semis: number): DiatonicAltDegree {
        switch (semis) {
            case 0: return DiatonicAltDegree.I;
            case 1: return DiatonicAltDegree.from(DiatonicDegree.I, 1);
            case 2: return DiatonicAltDegree.II;
            case 3: return DiatonicAltDegree.from(DiatonicDegree.II, 1);
            case 4: return DiatonicAltDegree.III;
            case 5: return DiatonicAltDegree.IV;
            case 6: return DiatonicAltDegree.from(DiatonicDegree.IV, 1);
            case 7: return DiatonicAltDegree.V;
            case 8: return DiatonicAltDegree.from(DiatonicDegree.V, 1);
            case 9: return DiatonicAltDegree.VI;
            case 10: return DiatonicAltDegree.from(DiatonicDegree.VI, 1);
            case 11: return DiatonicAltDegree.VII;
        }
    }

    reparametrizer: (i, acc) => number;

    private static fromIntervals7(d1: number, d2: number, d3: number, d4: number, d5: number, d6: number, d7: number): Scale {
        let degrees = this.intervals2Degrees([d1, d2, d3, d4, d5, d6, d7], this.sevenReparam);
        let scale = Scale.fromDegrees(...degrees);
        if (!Object.isFrozen((<any>scale)._precalcDegrees)) {
            (<any>scale)._precalcDegrees = degrees;
            Object.freeze((<any>scale)._precalcDegrees);
        }

        return scale;
    }

    private static intervals2Degrees(distances: number[], reparametrizer: (i: number, acc: number) => DiatonicAltDegree = this.defaultReparam): DiatonicAltDegree[] {
        let degrees: DiatonicAltDegree[] = [DiatonicAltDegree.I];
        let distancesAcc = 0;
        for (let i = 2; i <= distances.length; i++) {
            distancesAcc += distances[i - 2];
            let iFixed = reparametrizer(i, distancesAcc).diatonicDegree.intValue;
            let diatonicDegree = DiatonicDegree.fromInt(iFixed);
            let alts = distancesAcc - Scale.MAJOR.degrees[iFixed].semis;
            let degree: DiatonicAltDegree = DiatonicAltDegree.from(diatonicDegree, alts);
            degrees.push(degree);
        }

        return degrees;
    }

    get scaleDiatonicAlt(): Scale {
        let ic: number[] = this._scaleChromatic.intraIntervals;

        if (this._scaleChromatic.length == 7) {
            return ScaleDiatonicAltConversor.fromIntervals7(ic[0], ic[1], ic[2], ic[3], ic[4], ic[5], ic[6]);
        } else {
            let degrees: DiatonicAltDegree[] = ScaleDiatonicAltConversor.intervals2Degrees(ic);
            return Scale.fromDegrees(...degrees);
        }
    }
}