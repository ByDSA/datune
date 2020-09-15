import { MusicalDuration } from './MusicalDuration';

export default () => {
    if (MusicalDuration.QUARTER)
        return;

    MusicalDuration.MAXIMA = new MusicalDuration(8);
    MusicalDuration.LONGA = new MusicalDuration(4);
    MusicalDuration.DOUBLE = new MusicalDuration(2);
    MusicalDuration.WHOLE = new MusicalDuration(1);
    MusicalDuration.HALF = new MusicalDuration(1 / 2.0);
    MusicalDuration.QUARTER = new MusicalDuration(1 / 4.0);
    MusicalDuration.EIGHTH = new MusicalDuration(1 / 8.0);
    MusicalDuration.SIXTEENTH = new MusicalDuration(1 / 16.0);
    MusicalDuration.THIRTYSECOND = new MusicalDuration(1 / 32.0);
    MusicalDuration.SIXTYFOURTH = new MusicalDuration(1 / 64.0);

    MusicalDuration.ZERO = new MusicalDuration(0);
}