import { PrecalcCache } from '@datune/utils';
import { MusicalDuration } from './MusicalDuration';

export type HashingObject = number;
export class MusicalDurationCache extends PrecalcCache<MusicalDuration, HashingObject>{
    getHash(hashingObject: HashingObject): string {
        return hashingObject.toString();
    }

    getHashingObject(musicalDuration: MusicalDuration): HashingObject {
        return musicalDuration.value;
    }
}