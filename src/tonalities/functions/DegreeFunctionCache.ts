import { PrecalcCache } from '../../common/PrecalcCache';
import { DiatonicAltDegree } from '../../scales/degrees/DiatonicAltDegree';
import { DiatonicAltPattern } from '../../patterns/DiatonicAltPattern';
import { DegreeFunction } from './DegreeFunction';

export function hashCodeFunction(degree: DiatonicAltDegree, pattern: DiatonicAltPattern): string {
    return degree.hashCode() + "|" + pattern.hashCode();
}

export type HashingObjectType = { degree: DiatonicAltDegree, pattern: DiatonicAltPattern };
export class DegreeFunctionCache extends PrecalcCache<DegreeFunction, HashingObjectType>{
    getHash(hashingObject: HashingObjectType): string {
        return hashCodeFunction(hashingObject.degree, hashingObject.pattern);
    }

    getHashingObject(degreeFunction: DegreeFunction): HashingObjectType {
        return { degree: degreeFunction.degree, pattern: degreeFunction.pattern };
    }
}