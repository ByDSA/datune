import { PrecalcCache } from '@datune/utils';
import { ChordAlt, DiatonicAltArray } from '../../ChordAlt';

export type HashingObjectType = DiatonicAltArray
export class ChordAltCache extends PrecalcCache<ChordAlt, HashingObjectType> {
    getHash(hashingObject: HashingObjectType): string {
        let ret = "";
        for (let diatonicAlt of hashingObject)
            ret += "d" + diatonicAlt.valueOf();

        return ret;
    }

    getHashingObject(diatonicAltChord: ChordAlt): HashingObjectType {
        return diatonicAltChord.notes;
    }
}