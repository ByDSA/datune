import { PrecalcCache } from '@datune/utils';
import { IntervalDiatonic } from '../../../intervals';
import { DiatonicAltPattern, Difference, DifferenceArray } from './DiatonicAltPattern';


export function hashCodeDiatonicAltPatternValue(semis: number, intervalDiatonic: IntervalDiatonic): string {
    return "s:" + semis + "d:" + intervalDiatonic;
}

export function patternDiatonicAltHashCode(patternDiatonicAlt: DiatonicAltPattern): string {
    return _innerGetHash(patternDiatonicAlt.rootIntervals);
}

function _innerGetHash(values: Difference[]): string {
    let ret = "";
    for (const value of values) {
        ret += hashCodeDiatonicAltPatternValue(value.interval, value.intervalDiatonic);
    }
    return ret;
}

export class PatternAltCache extends PrecalcCache<DiatonicAltPattern, DifferenceArray>{
    getHash(values: Difference[]): string {
        return _innerGetHash(values);
    }

    getHashingObject(diatonicAltChordPattern: DiatonicAltPattern) {
        return diatonicAltChordPattern.rootIntervals;
    }
};