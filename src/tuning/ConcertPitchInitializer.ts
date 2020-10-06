import { Immutables } from '../common/Immutables';
import { spns } from '../initializer';
import { SPN } from '../pitches/symbolic/SPN';
import { ConcertPitch } from './ConcertPitch';

export default () => {
    if (ConcertPitch.A440)
        return;

    spns.default();

    ConcertPitch.A440 = ConcertPitch.fromFrequency(440, SPN.A4);
    ConcertPitch.A432 = ConcertPitch.fromFrequency(432, SPN.A4);
    ConcertPitch.A444 = ConcertPitch.fromFrequency(444, SPN.A4);

    Immutables.lockr(ConcertPitch);
}