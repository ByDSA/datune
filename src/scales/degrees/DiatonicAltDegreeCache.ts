import { PrecalcCache } from "../../common/PrecalcCache";
import { DiatonicAltDegree } from './DiatonicAltDegree';
import { DiatonicDegree } from './DiatonicDegree';

export type HashingObjectType = { diatonicDegree: DiatonicDegree, alts: number };
export class DiatonicAltDegreeCache extends PrecalcCache<DiatonicAltDegree, HashingObjectType>{
    getHash(hashingObject: HashingObjectType): string {
        return hashingObject.diatonicDegree.hashCode() + "a:" + hashingObject.alts;
    }

    getHashingObject(diatonicAltDegree: DiatonicAltDegree): HashingObjectType {
        return { diatonicDegree: diatonicAltDegree.diatonicDegree, alts: diatonicAltDegree.alts };
    }
}