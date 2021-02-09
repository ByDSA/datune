import { IntervalDiatonic } from "../../../diatonic/IntervalDiatonic";
import { IntervalDiatonicAlt } from "../../IntervalDiatonicAlt";
import { Quality } from "../../../quality/Quality";


export class IntervalAltStaticNames {
    static get PERFECT_UNISON(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.UNISON, Quality.PERFECT);
    }
    static get DIMINISHED_SECOND(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SECOND, Quality.DIMINISHED);
    }
    static get MINOR_SECOND(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SECOND, Quality.MINOR);
    }
    static get AUGMENTED_UNISON(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.UNISON, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_UNISON(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.UNISON, Quality.DOUBLY_AUGMENTED);
    }
    static get MAJOR_SECOND(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SECOND, Quality.MAJOR);
    }
    static get DIMINISHED_THIRD(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.DIMINISHED);
    }
    static get DOUBLY_DIMINISHED_THIRD(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.DOUBLY_DIMINISHED);
    }
    static get MINOR_THIRD(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.MINOR);
    }
    static get AUGMENTED_SECOND(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SECOND, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_SECOND(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SECOND, Quality.DOUBLY_AUGMENTED);
    }
    static get MAJOR_THIRD(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.MAJOR);
    }
    static get DIMINISHED_FOURTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FOURTH, Quality.DIMINISHED);
    }
    static get DOUBLY_DIMINISHED_FOURTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FOURTH, Quality.DOUBLY_DIMINISHED);
    }
    static get PERFECT_FOURTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FOURTH, Quality.PERFECT);
    }
    static get AUGMENTED_THIRD(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_THIRD(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.DOUBLY_AUGMENTED);
    }
    static get DIMINISHED_FIFTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FIFTH, Quality.DIMINISHED);
    }
    static get DOUBLY_DIMINISHED_FIFTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FIFTH, Quality.DOUBLY_DIMINISHED);
    }
    static get AUGMENTED_FOURTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FOURTH, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_FOURTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FOURTH, Quality.DOUBLY_AUGMENTED);
    }
    static get PERFECT_FIFTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FIFTH, Quality.PERFECT);
    }
    static get DIMINISHED_SIXTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SIXTH, Quality.DIMINISHED);
    }
    static get DOUBLY_DIMINISHED_SIXTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SIXTH, Quality.DOUBLY_DIMINISHED);
    }
    static get MINOR_SIXTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SIXTH, Quality.MINOR);
    }
    static get AUGMENTED_FIFTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FIFTH, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_FIFTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FIFTH, Quality.DOUBLY_AUGMENTED);
    }
    static get MAJOR_SIXTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SIXTH, Quality.MAJOR);
    }
    static get DIMINISHED_SEVENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SEVENTH, Quality.DIMINISHED);
    }
    static get DOUBLY_DIMINISHED_SEVENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SEVENTH, Quality.DOUBLY_DIMINISHED);
    }
    static get MINOR_SEVENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SEVENTH, Quality.MINOR);
    }
    static get AUGMENTED_SIXTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SIXTH, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_SIXTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SIXTH, Quality.DOUBLY_AUGMENTED);
    }
    static get MAJOR_SEVENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SEVENTH, Quality.MAJOR);
    }
    static get DIMINISHED_OCTAVE(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.OCTAVE, Quality.DIMINISHED);
    }
    static get DOUBLY_DIMINISHED_OCTAVE(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.OCTAVE, Quality.DOUBLY_DIMINISHED);
    }
    static get PERFECT_OCTAVE(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.OCTAVE, Quality.PERFECT);
    }
    static get AUGMENTED_SEVENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SEVENTH, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_SEVENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.SEVENTH, Quality.DOUBLY_AUGMENTED);
    }
    static get DIMINISHED_NINTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.NINTH, Quality.DIMINISHED);
    }
    static get DOUBLY_DIMINISHED_NINTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.NINTH, Quality.DOUBLY_DIMINISHED);
    }
    static get MINOR_NINTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.NINTH, Quality.MINOR);
    }
    static get AUGMENTED_OCTAVE(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.OCTAVE, Quality.AUGMENTED);
    }
    static get MAJOR_NINTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.NINTH, Quality.MAJOR);
    }
    static get DIMINISHED_TENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.TENTH, Quality.DIMINISHED);
    }
    static get DOUBLY_DIMINISHED_TENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.TENTH, Quality.DOUBLY_DIMINISHED);
    }
    static get MINOR_TENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.TENTH, Quality.MINOR);
    }
    static get AUGMENTED_NINTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.NINTH, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_NINTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.NINTH, Quality.DOUBLY_AUGMENTED);
    }
    static get MAJOR_TENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.TENTH, Quality.MAJOR);
    }
    static get DIMINISHED_ELEVENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.ELEVENTH, Quality.DIMINISHED);
    }
    static get DOUBLY_DIMINISHED_ELEVENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.ELEVENTH, Quality.DOUBLY_DIMINISHED);
    }
    static get PERFECT_ELEVENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.ELEVENTH, Quality.MINOR);
    }
    static get AUGMENTED_TENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.TENTH, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_TENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.TENTH, Quality.DOUBLY_AUGMENTED);
    }
    static get DIMINISHED_TWELFTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.TWELFTH, Quality.DIMINISHED);
    }
    static get DOUBLY_DIMINISHED_TWELFTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.TWELFTH, Quality.DOUBLY_DIMINISHED);
    }
    static get AUGMENTED_ELEVENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.ELEVENTH, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_ELEVENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.ELEVENTH, Quality.DOUBLY_AUGMENTED);
    }
    static get PERFECT_TWELFTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.TWELFTH, Quality.PERFECT);
    }
    static get DIMINISHED_THIRTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.THIRTEENTH, Quality.DIMINISHED);
    }
    static get DOUBLY_DIMINISHED_THIRTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.THIRTEENTH, Quality.DOUBLY_DIMINISHED);
    }
    static get MINOR_THIRTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.THIRTEENTH, Quality.MINOR);
    }
    static get AUGMENTED_TWELFTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.TWELFTH, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_TWELFTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.TWELFTH, Quality.DOUBLY_AUGMENTED);
    }
    static get MAJOR_THIRTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.THIRTEENTH, Quality.MAJOR);
    }
    static get DIMINISHED_FOURTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FOURTEENTH, Quality.DIMINISHED);
    }
    static get DOUBLY_DIMINISHED_FOURTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FOURTEENTH, Quality.DOUBLY_DIMINISHED);
    }
    static get MINOR_FOURTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FOURTEENTH, Quality.MINOR);
    }
    static get AUGMENTED_THIRTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.THIRTEENTH, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_THIRTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.THIRTEENTH, Quality.DOUBLY_AUGMENTED);
    }
    static get MAJOR_FOURTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FOURTEENTH, Quality.MAJOR);
    }
    static get DIMINISHED_FIFTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FIFTEENTH, Quality.DIMINISHED);
    }
    static get DOUBLY_DIMINISHED_FIFTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FIFTEENTH, Quality.DOUBLY_DIMINISHED);
    }
    static get PERFECT_FIFTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FIFTEENTH, Quality.PERFECT);
    }
    static get AUGMENTED_FOURTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FOURTEENTH, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_FOURTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FOURTEENTH, Quality.DOUBLY_AUGMENTED);
    }
    static get AUGMENTED_FIFTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FIFTEENTH, Quality.AUGMENTED);
    }
    static get DOUBLY_AUGMENTED_FIFTEENTH(): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.from(IntervalDiatonic.FIFTEENTH, Quality.DOUBLY_AUGMENTED);
    }
}