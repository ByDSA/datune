import { NonEmptyArray, PrecalcCache } from '@datune/utils';
import { IntervalPitch } from '../../../../intervals';
import { ScalePitch } from '../../ScalePitch';

export type HashingObject = NonEmptyArray<IntervalPitch>;

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