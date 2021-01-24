import { PrecalcCache } from '@datune/utils';
import { DiatonicAlt } from '../../../../pitches';
import { ScaleAlt } from '../../../../scales';
import { TonalityAlt } from '../../TonalityAlt';

export type HashingObjectType = { root: DiatonicAlt, scale: ScaleAlt };

export class TonalityAltCache extends PrecalcCache<TonalityAlt, HashingObjectType>{
    getHash(hashingObject: HashingObjectType): string {
        return hashingObject.scale.hashCode() + ":" + hashingObject.root.valueOf();
    }

    getHashingObject(tonality: TonalityAlt): HashingObjectType {
        return { root: tonality.root, scale: tonality.scale };
    }
}