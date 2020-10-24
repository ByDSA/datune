import { PrecalcCache } from "@datune/utils/PrecalcCache";
import { Scale, IntervalType } from './Scale';

export type HashingObjectType = IntervalType[];
export class ScaleCache extends PrecalcCache<Scale, HashingObjectType> {
    getHash(hashingObject: HashingObjectType): string {
        let ret = "";
        for (const interval of hashingObject)
            ret += interval.hashCode();
        return ret;
    }

    getHashingObject(scale: Scale): HashingObjectType {
        return scale.intraIntervals;
    }
}