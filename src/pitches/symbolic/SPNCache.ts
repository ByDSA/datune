import { PrecalcCache } from "../../common/PrecalcCache";
import { Chromatic } from '../../degrees/Chromatic';
import { SPN } from './SPN';

export type HashingObject = { chromatic: Chromatic, octave: number };
export class SPNCache extends PrecalcCache<SPN, HashingObject> {
    getHash(hashingObject: HashingObject): string {
        let value = hashingObject.chromatic.valueOf() + hashingObject.octave * Chromatic.NUMBER
        return "" + value;
    }

    getHashingObject(spn: SPN): HashingObject {
        return { chromatic: spn.chromatic, octave: spn.octave };
    }
}