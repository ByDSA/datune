import { PrecalcCache } from "@datune/utils/PrecalcCache";
import { Chromatic } from '../degrees/Chromatic';
import { ChromaticChord } from './ChromaticChordMainClass';

export type HashingObjectType = Chromatic[];
export class ChromaticCache extends PrecalcCache<ChromaticChord, HashingObjectType> {
    getHash(hashingObject: HashingObjectType): string {
        let ret = "";
        for (const chromatic of hashingObject)
            ret += chromatic.valueOf() + ":";

        return ret;
    }

    getHashingObject(chromaticChord: ChromaticChord): HashingObjectType {
        return chromaticChord.notes;
    }
}