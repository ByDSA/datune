import { PrecalcCache } from '../common/PrecalcCache';
import { IntervalPitch } from '../tuning/IntervalPitch';
import { ScalePitch } from './ScalePitch';

export type HashingObject = IntervalPitch[];
export class ScalePitchCache extends PrecalcCache<ScalePitch, HashingObject> {
    getHash(hashingObject: HashingObject): string {
        let ret = "";
        for (const interval of hashingObject)
            ret += interval.hashCode() + "|";
        return ret;
    }

    getHashingObject(scale: ScalePitch): HashingObject {
        return scale.intraIntervals;
    }
}