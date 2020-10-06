import { PrecalcCache } from "../../common/PrecalcCache";
import { Chromatic } from '../../degrees/Chromatic';
import { SPN } from './SPN';
import { DiatonicAlt } from '../../degrees/DiatonicAlt';

export type HashingObject = { diatonicAlt: DiatonicAlt, octave: number };
export class SPNCache extends PrecalcCache<SPN, HashingObject> {
    getHash(hashingObject: HashingObject): string {
        let value = hashingObject.diatonicAlt.valueOf() + hashingObject.octave * Chromatic.NUMBER
        return "" + value;
    }

    getHashingObject(spn: SPN): HashingObject {
        return { diatonicAlt: spn.degree, octave: spn.octave };
    }
}