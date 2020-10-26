import { MusicalDuration } from './MusicalDuration';

export default () => {
    if (MusicalDuration.QUARTER)
        return;

    MusicalDuration.MAXIMA = MusicalDuration.from(8);
    MusicalDuration.LONGA = MusicalDuration.from(4);
    MusicalDuration.DOUBLE = MusicalDuration.from(2);
    MusicalDuration.WHOLE = MusicalDuration.from(1);
    MusicalDuration.HALF = MusicalDuration.from(1 / 2.0);
    MusicalDuration.QUARTER = MusicalDuration.from(1 / 4.0);
    MusicalDuration.EIGHTH = MusicalDuration.from(1 / 8.0);
    MusicalDuration.SIXTEENTH = MusicalDuration.from(1 / 16.0);
    MusicalDuration.THIRTYSECOND = MusicalDuration.from(1 / 32.0);
    MusicalDuration.SIXTYFOURTH = MusicalDuration.from(1 / 64.0);

    MusicalDuration.ZERO = MusicalDuration.from(0);
}