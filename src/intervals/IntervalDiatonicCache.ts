import { PrecalcCache } from "../common/PrecalcCache";
import { IntervalDiatonic } from './IntervalDiatonic';

export type HashingObject = number;
export class IntervalDiatonicCache extends PrecalcCache<IntervalDiatonic, HashingObject> {
    getHash(num: HashingObject): string {
        return "" + num;
    }

    getHashingObject(intervalDiatonic: IntervalDiatonic): HashingObject {
        return intervalDiatonic.valueOf();
    }
}