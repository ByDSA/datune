import { IntervalDiatonic } from '../intervals/IntervalDiatonic';
import { diatonics } from '../initializer';

export default () => {
    if (IntervalDiatonic.UNISON)
        return;

    diatonics.default();

    IntervalDiatonic.UNISON = IntervalDiatonic.from(0);
    IntervalDiatonic.SECOND = IntervalDiatonic.from(1);
    IntervalDiatonic.THIRD = IntervalDiatonic.from(2);
    IntervalDiatonic.FOURTH = IntervalDiatonic.from(3);
    IntervalDiatonic.FIFTH = IntervalDiatonic.from(4);
    IntervalDiatonic.SIXTH = IntervalDiatonic.from(5);
    IntervalDiatonic.SEVENTH = IntervalDiatonic.from(6);
    IntervalDiatonic.OCTAVE = IntervalDiatonic.from(7);
    IntervalDiatonic.NINTH = IntervalDiatonic.from(8);
    IntervalDiatonic.TENTH = IntervalDiatonic.from(9);
    IntervalDiatonic.ELEVENTH = IntervalDiatonic.from(10);
    IntervalDiatonic.TWELFTH = IntervalDiatonic.from(11);
    IntervalDiatonic.THIRTEENTH = IntervalDiatonic.from(12);
    IntervalDiatonic.FOURTEENTH = IntervalDiatonic.from(13);
    IntervalDiatonic.FIFTEENTH = IntervalDiatonic.from(14);
}