import { PrecalcCache } from '../common/PrecalcCache';
import { ScaleChromatic, I } from './ScaleChromatic';

export type HashingObject = I[];
export class ScaleChromaticCache extends PrecalcCache<ScaleChromatic, HashingObject>{
    getHash(hashingObject: HashingObject): string {
        let ret = "";
        for (const interval of hashingObject)
            ret += interval + "-";
        return ret;
    }

    getHashingObject(scale: ScaleChromatic): HashingObject {
        return scale.intraIntervals;
    }
}