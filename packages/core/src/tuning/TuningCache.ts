import { PrecalcCache } from '@datune/utils/PrecalcCache';
import { Tuning } from './Tuning';
import { ConcertPitch } from './ConcertPitch';
import { Temperament } from './Temperament';

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