import { PrecalcCache } from '../common/PrecalcCache';
import { IntervalDiatonic } from '../intervals/IntervalDiatonic';
import { DiatonicAltPattern, Difference } from './DiatonicAltPattern';

export function hashCodeDiatonicAltPatternValue(semis: number, intervalDiatonic: IntervalDiatonic): string {
    return "s:" + semis + "d:" + intervalDiatonic;
}

export class DiatonicAltPatternCache extends PrecalcCache<DiatonicAltPattern, Difference[]>{
    getHash(values: Difference[]): string {
        let hash: string = "";
        for (const value of values) {
            hash += hashCodeDiatonicAltPatternValue(value.intervalChromatic, value.intervalDiatonic);
        }
        return hash;
    }

    getHashingObject(diatonicAltChordPattern: DiatonicAltPattern) {
        return diatonicAltChordPattern.rootIntervals;
    }
};