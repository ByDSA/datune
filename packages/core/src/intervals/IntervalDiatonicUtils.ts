import { IntervalDiatonic } from './IntervalDiatonic';
import { IntervalDiatonicAlt } from './IntervalDiatonicAlt';

export class IntervalDiatonicUtils {
    static fromIntervalChromatic(intervalChromatic: IntervalDiatonicAlt): IntervalDiatonic {
        switch (intervalChromatic) {
            case IntervalDiatonicAlt.AUGMENTED_UNISON:
            case IntervalDiatonicAlt.PERFECT_UNISON:
                return IntervalDiatonic.UNISON;
            case IntervalDiatonicAlt.AUGMENTED_SECOND:
            case IntervalDiatonicAlt.DIMINISHED_SECOND:
            case IntervalDiatonicAlt.MAJOR_SECOND:
            case IntervalDiatonicAlt.MINOR_SECOND:
                return IntervalDiatonic.SECOND;
            case IntervalDiatonicAlt.AUGMENTED_THIRD:
            case IntervalDiatonicAlt.DIMINISHED_THIRD:
            case IntervalDiatonicAlt.MAJOR_THIRD:
            case IntervalDiatonicAlt.MINOR_THIRD:
                return IntervalDiatonic.THIRD;
            case IntervalDiatonicAlt.AUGMENTED_FOURTH:
            case IntervalDiatonicAlt.DIMINISHED_FOURTH:
            case IntervalDiatonicAlt.PERFECT_FOURTH:
                return IntervalDiatonic.FOURTH;
            case IntervalDiatonicAlt.AUGMENTED_FIFTH:
            case IntervalDiatonicAlt.DIMINISHED_FIFTH:
            case IntervalDiatonicAlt.PERFECT_FIFTH:
                return IntervalDiatonic.FIFTH;
            case IntervalDiatonicAlt.AUGMENTED_SIXTH:
            case IntervalDiatonicAlt.DIMINISHED_SIXTH:
            case IntervalDiatonicAlt.MAJOR_SIXTH:
            case IntervalDiatonicAlt.MINOR_SIXTH:
                return IntervalDiatonic.SIXTH;
            case IntervalDiatonicAlt.AUGMENTED_SEVENTH:
            case IntervalDiatonicAlt.DIMINISHED_SEVENTH:
            case IntervalDiatonicAlt.MAJOR_SEVENTH:
            case IntervalDiatonicAlt.MINOR_SEVENTH:
                return IntervalDiatonic.SEVENTH;
            case IntervalDiatonicAlt.DIMINISHED_OCTAVE:
            case IntervalDiatonicAlt.PERFECT_OCTAVE:
            case IntervalDiatonicAlt.AUGMENTED_OCTAVE:
                return IntervalDiatonic.OCTAVE;
            case IntervalDiatonicAlt.AUGMENTED_NINTH:
            case IntervalDiatonicAlt.DIMINISHED_NINTH:
            case IntervalDiatonicAlt.MAJOR_NINTH:
            case IntervalDiatonicAlt.MINOR_NINTH:
                return IntervalDiatonic.NINTH;
            case IntervalDiatonicAlt.AUGMENTED_TENTH:
            case IntervalDiatonicAlt.DIMINISHED_TENTH:
            case IntervalDiatonicAlt.MAJOR_TENTH:
            case IntervalDiatonicAlt.MINOR_TENTH:
                return IntervalDiatonic.TENTH;
            case IntervalDiatonicAlt.AUGMENTED_ELEVENTH:
            case IntervalDiatonicAlt.DIMINISHED_ELEVENTH:
            case IntervalDiatonicAlt.PERFECT_ELEVENTH:
                return IntervalDiatonic.ELEVENTH;
            case IntervalDiatonicAlt.AUGMENTED_TWELFTH:
            case IntervalDiatonicAlt.DIMINISHED_TWELFTH:
            case IntervalDiatonicAlt.PERFECT_TWELFTH:
                return IntervalDiatonic.TWELFTH;
            case IntervalDiatonicAlt.AUGMENTED_THIRTEENTH:
            case IntervalDiatonicAlt.DIMINISHED_THIRTEENTH:
            case IntervalDiatonicAlt.MAJOR_THIRTEENTH:
            case IntervalDiatonicAlt.MINOR_THIRTEENTH:
                return IntervalDiatonic.THIRTEENTH;
            case IntervalDiatonicAlt.AUGMENTED_FOURTEENTH:
            case IntervalDiatonicAlt.DIMINISHED_FOURTEENTH:
            case IntervalDiatonicAlt.MAJOR_FOURTEENTH:
            case IntervalDiatonicAlt.MINOR_FOURTEENTH:
                return IntervalDiatonic.FOURTEENTH;
            case IntervalDiatonicAlt.DIMINISHED_FIFTEENTH:
            case IntervalDiatonicAlt.PERFECT_FIFTEENTH:
            case IntervalDiatonicAlt.AUGMENTED_FIFTEENTH:
                return IntervalDiatonic.FIFTEENTH;
        }

        Error();
    }
}