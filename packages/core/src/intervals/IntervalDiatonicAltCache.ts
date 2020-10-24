import { PrecalcCache } from '@datune/utils/PrecalcCache';
import { IntervalDiatonicAlt } from './IntervalDiatonicAlt';
import { IntervalDiatonic } from './IntervalDiatonic';
import { Quality } from './Quality';

export type HashingObject = { interval: IntervalDiatonic, quality: Quality };
export class IntervalDiatonicAltCache extends PrecalcCache<IntervalDiatonicAlt, HashingObject>{
    getHash(hashingObject: HashingObject): string {
        return hashingObject.interval + "|" + hashingObject.quality.shortName;
    }

    getHashingObject(intervalDiatonicAlt: IntervalDiatonicAlt): HashingObject {
        return { interval: intervalDiatonicAlt.intervalDiatonic, quality: intervalDiatonicAlt.quality };
    }
};