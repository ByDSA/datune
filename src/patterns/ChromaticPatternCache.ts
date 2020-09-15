import { PrecalcCache } from '../common/PrecalcCache';
import { ChromaticPattern, I } from './ChromaticPattern';

export class ChromaticPatternCache extends PrecalcCache<ChromaticPattern, I[]>{
    getHash(hashingObject: I[]) {
        return hashingObject.toString();
    }

    getHashingObject(chromaticChordPattern: ChromaticPattern) {
        return chromaticChordPattern.rootIntervals;
    }
}