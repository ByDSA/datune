import { PrecalcCache } from "@datune/utils/PrecalcCache";
import { Chromatic } from '../degrees/Chromatic';
import { ChromaticChordMainClass } from './ChromaticChordMainClass';

export type HashingObjectType = Chromatic[];
export class ChromaticCache extends PrecalcCache<ChromaticChordMainClass, HashingObjectType> {
    getHash(hashingObject: HashingObjectType): string {
        let ret = "";
        for (const chromatic of hashingObject)
            ret += chromatic.valueOf() + ":";

        return ret;
    }

    getHashingObject(chromaticChord: ChromaticChordMainClass): HashingObjectType {
        return chromaticChord.notes;
    }
}