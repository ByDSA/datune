import { NonEmptyArray, PrecalcCache } from "@datune/utils";
import { IntervalDiatonicAlt } from "../../../../../../intervals";
import { ScaleAlt } from '../../ScaleAlt';

export type HashingObjectType = NonEmptyArray<IntervalDiatonicAlt>;

export class ScaleAltCache extends PrecalcCache<ScaleAlt, HashingObjectType> {
    getHash(hashingObject: HashingObjectType): string {
        let ret = "";
        for (const interval of hashingObject)
            ret += interval.hashCode();
        return ret;
    }

    getHashingObject(scale: ScaleAlt): HashingObjectType {
        return scale.intraIntervals;
    }
}