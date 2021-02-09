import { PrecalcCache } from '@datune/utils';
import { ConcertPitch } from '../../pitches';
import { Temperament } from '../temperament/Temperament';
import { Tuning } from './Tuning';

export type HashingObject = { concertPitch: ConcertPitch, temperament: Temperament };
export class TuningCache extends PrecalcCache<Tuning, HashingObject>{
    getHash(hashingObject: HashingObject): string {
        let concertPitchHashCode = hashingObject.concertPitch.hashCode();
        let temperamentHashCode = hashingObject.temperament.hashCode();

        if (!concertPitchHashCode || !temperamentHashCode)
            throw new Error();

        return concertPitchHashCode + temperamentHashCode;
    }

    getHashingObject(tuning: Tuning): HashingObject {
        return { concertPitch: tuning.concertPitch, temperament: tuning.temperament };
    }
}