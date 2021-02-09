import { PrecalcCache } from '@datune/utils';
import { Chromatic } from '../../../../pitches';
import { Scale } from '../../../../scales';
import { Tonality } from '../../Tonality';

export type HashingObjectType = { root: Chromatic, scale: Scale };

export class TonalityCache extends PrecalcCache<Tonality, HashingObjectType>{
    getHash(hashingObject: HashingObjectType): string {
        return hashingObject.scale.hashCode() + ":" + hashingObject.root.valueOf();
    }

    getHashingObject(tonality: Tonality): HashingObjectType {
        return { root: tonality.root, scale: tonality.scale };
    }
}