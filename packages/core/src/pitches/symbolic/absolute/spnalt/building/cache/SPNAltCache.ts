import { PrecalcCache } from "@datune/utils";
import { DiatonicAlt } from "../../../../octave/alt/DiatonicAlt";
import { Chromatic } from "../../../../octave/chromatic/Chromatic";
import { SPNAlt } from '../../SPNAlt';


export type HashingObject = { diatonicAlt: DiatonicAlt, octave: number };


export class SPNCache extends PrecalcCache<SPNAlt, HashingObject> {
    getHash(hashingObject: HashingObject): string {
        let value = hashingObject.diatonicAlt.valueOf() + hashingObject.octave * Chromatic.NUMBER
        return "" + value;
    }

    getHashingObject(spn: SPNAlt): HashingObject {
        return { diatonicAlt: spn.degree, octave: spn.octave };
    }
}