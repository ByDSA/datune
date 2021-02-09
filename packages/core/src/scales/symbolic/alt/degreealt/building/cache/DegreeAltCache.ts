import { PrecalcCache } from "@datune/utils";
import { DiatonicDegree } from '../../../../degrees/DiatonicDegree';
import { DegreeAlt } from '../../DegreeAlt';

function _innerGetHash(diatonicDegree: DiatonicDegree, alts: number) {
    return diatonicDegree.hashCode() + "a:" + alts;
}

export function degreeAltHashCode(degreeAlt: DegreeAlt) {
    return _innerGetHash(degreeAlt.diatonicDegree, degreeAlt.alts);
}

export type HashingObjectType = { diatonicDegree: DiatonicDegree, alts: number };
export class DegreeAltCache extends PrecalcCache<DegreeAlt, HashingObjectType>{
    getHash(hashingObject: HashingObjectType): string {
        return _innerGetHash(hashingObject.diatonicDegree, hashingObject.alts);
    }

    getHashingObject(degreeAlt: DegreeAlt): HashingObjectType {
        return { diatonicDegree: degreeAlt.diatonicDegree, alts: degreeAlt.alts };
    }
}