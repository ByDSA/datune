import { PrecalcCache } from '../common/PrecalcCache';
import { ConcertPitch } from './ConcertPitch';
import { SymbolicPitch } from '../pitches/symbolic/SymbolicPitch';

export type HashingObject = { frequency: number, symbolicPitch: SymbolicPitch };
export class ConcertPitchCache extends PrecalcCache<ConcertPitch, HashingObject>{
    getHash(hashingObject: HashingObject): string {
        let symbolicPitchHashCode: any = hashingObject.symbolicPitch.valueOf();

        return symbolicPitchHashCode + ":" + hashingObject.frequency;
    }

    getHashingObject(concertPitch: ConcertPitch): HashingObject {
        return { frequency: concertPitch.frequency, symbolicPitch: concertPitch.symbolicPitch };
    }
}