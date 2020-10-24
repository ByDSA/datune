import { PrecalcCache } from '@datune/utils/PrecalcCache';
import { DiatonicAlt } from './DiatonicAlt';
import { Diatonic } from './Diatonic';

export type HashingObjectType = { diatonic: Diatonic, alts: number };
export class DiatonicAltCache extends PrecalcCache<DiatonicAlt, HashingObjectType>{
    getHash(hashingObject: HashingObjectType): string {
        return hashingObject.diatonic.valueOf() + ":" + hashingObject.alts;
    }

    getHashingObject(diatonicAlt: DiatonicAlt): HashingObjectType {
        return { diatonic: diatonicAlt.diatonic, alts: diatonicAlt.alts };
    }
}