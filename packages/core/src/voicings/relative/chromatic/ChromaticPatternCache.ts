import { PrecalcCache } from '@datune/utils';
import { ChromaticInterval, ChromaticIntervalArray } from '../../../intervals';
import { ChromaticPattern } from './ChromaticPattern';

export class ChromaticPatternCache extends PrecalcCache<ChromaticPattern, ChromaticIntervalArray>{
    getHash(hashingObject: ChromaticInterval[]) {
        return hashingObject.toString();
    }

    getHashingObject(pattern: ChromaticPattern) {
        return pattern.rootIntervals;
    }
}