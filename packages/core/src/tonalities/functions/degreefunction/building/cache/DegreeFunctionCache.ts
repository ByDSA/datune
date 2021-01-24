import { PrecalcCache } from '@datune/utils';
import { DegreeAlt, degreeAltHashCode } from '../../../../../scales';
import { DiatonicAltPattern } from '../../../../../voicings/relative/alt/DiatonicAltPattern';
import { patternDiatonicAltHashCode } from '../../../../../voicings/relative/alt/DiatonicAltPatternCache';
import { DegreeFunction } from '../../DegreeFunction';

export function degreeFunctionHashCode(degree: DegreeAlt, pattern: DiatonicAltPattern): string {
    return degreeAltHashCode(degree) + "|" + patternDiatonicAltHashCode(pattern);
}

export type HashingObjectType = { degree: DegreeAlt, pattern: DiatonicAltPattern };
export class DegreeFunctionCache extends PrecalcCache<DegreeFunction, HashingObjectType>{
    getHash(hashingObject: HashingObjectType): string {
        return degreeFunctionHashCode(hashingObject.degree, hashingObject.pattern);
    }

    getHashingObject(degreeFunction: DegreeFunction): HashingObjectType {
        return { degree: degreeFunction.degreeAlt, pattern: degreeFunction.patternAlt };
    }
}