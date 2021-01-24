import { NonEmptyArray, PrecalcCache } from '@datune/utils';
import { ChromaticInterval } from '../../../../../../intervals';
import { Scale } from '../../Scale';

export type HashingObject = NonEmptyArray<ChromaticInterval>;

export class ScaleCache extends PrecalcCache<Scale, HashingObject>{
    getHash(hashingObject: HashingObject): string {
        let ret = "";
        for (const interval of hashingObject)
            ret += interval + "-";
        return ret;
    }

    getHashingObject(scale: Scale): HashingObject {
        return scale.intraIntervals;
    }
}