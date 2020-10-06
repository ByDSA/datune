import { PrecalcCache } from '../common/PrecalcCache';
import { DiatonicAltChord } from './DiatonicAltChord';
import { DiatonicAlt } from '../degrees/DiatonicAlt';

export type HashingObjectType = DiatonicAlt[];
export class DiatonicAltChordCache extends PrecalcCache<DiatonicAltChord, HashingObjectType> {
    getHash(hashingObject: HashingObjectType): string {
        let ret = "";
        for (let diatonicAlt of hashingObject)
            ret += "d" + diatonicAlt.valueOf();

        return ret;
    }

    getHashingObject(diatonicAltChord: DiatonicAltChord): HashingObjectType {
        return diatonicAltChord.notes;
    }
};