import { PrecalcCache } from '@datune/utils/PrecalcCache';
import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { Scale } from '../scales/Scale';
import { Tonality } from './Tonality';

export type HashingObjectType = { root: DiatonicAlt, scale: Scale };
export class TonalityCache extends PrecalcCache<Tonality, HashingObjectType>{
    getHash(hashingObject: HashingObjectType): string {
        return hashingObject.scale.hashCode() + ":" + hashingObject.root.valueOf();
    }

    getHashingObject(tonality: Tonality): HashingObjectType {
        return { root: tonality.root, scale: tonality.scale };
    }
}