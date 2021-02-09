import { PrecalcCache } from "@datune/utils";
import { ChromaticArray, ChromaticChord } from '../../ChromaticChord';

export type HashingObjectType = ChromaticArray;

export class ChromaticChordCache extends PrecalcCache<ChromaticChord, HashingObjectType> {
    getHash(hashingObject: HashingObjectType): string {
        let ret = "";
        for (const chromatic of hashingObject)
            ret += chromatic.valueOf() + ":";

        return ret;
    }

    getHashingObject(chord: ChromaticChord): HashingObjectType {
        return chord.notes;
    }
}