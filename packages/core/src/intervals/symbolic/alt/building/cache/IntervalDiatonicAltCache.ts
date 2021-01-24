import { PrecalcCache } from '@datune/utils';
import { IntervalDiatonic } from '../../../diatonic/IntervalDiatonic';
import { Quality } from '../../../quality/Quality';
import { IntervalDiatonicAlt } from '../../IntervalDiatonicAlt';

export type HashingObject = { interval: IntervalDiatonic, quality: Quality };

export class IntervalDiatonicAltCache extends PrecalcCache<IntervalDiatonicAlt, HashingObject> {
    getHash(hashingObject: HashingObject): string {
        return hashingObject.interval + "|" + hashingObject.quality.shortName;
    }

    getHashingObject(intervalDiatonicAlt: IntervalDiatonicAlt): HashingObject {
        return { interval: intervalDiatonicAlt.intervalDiatonic, quality: intervalDiatonicAlt.quality };
    }
}