import { ConcertPitch } from './ConcertPitch';
import { Temperament } from './Temperament';
import { Tuning } from './Tuning';
import { temperaments, concertPitches } from '../initializer';

export default () => {
    if (Tuning.EQUAL_440)
        return;

    concertPitches.default();
    temperaments.default();

    Tuning.EQUAL_440 = Tuning.from(ConcertPitch.A440, Temperament.ET12);
    Tuning.LIMIT_5_SYMMETRIC_N1_440 = Tuning.from(ConcertPitch.A440, Temperament.LIMIT_5_SYMMETRIC_N1);
}