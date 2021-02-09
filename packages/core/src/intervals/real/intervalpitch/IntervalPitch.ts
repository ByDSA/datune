import { Ratio } from "@datune/utils/math/ratios/Ratio";
import { RatioFrac } from "@datune/utils/math/ratios/RatioFrac";
import { RatioNumber } from "@datune/utils/math/ratios/RatioNumber";
import { RatioPow2Frac } from "@datune/utils/math/ratios/RatioPow2Frac";
import { Chromatic } from "../../../pitches";

export class IntervalPitch {
    static get UNISON(): IntervalPitch {
        if (!_UNISON)
            _UNISON = IntervalPitch.from(RatioNumber.from(1));
        return _UNISON;
    }
    static get OCTAVE(): IntervalPitch {
        if (!_OCTAVE)
            _OCTAVE = IntervalPitch.from(RatioNumber.from(2));
        return _OCTAVE;
    }
    static get CENT(): IntervalPitch {
        if (!_CENT)
            _CENT = IntervalPitch.from(RatioPow2Frac.fromCents(1));
        return _CENT;
    }

    private constructor(private _ratio: Ratio) {
    }

    static from(ratio: Ratio) {
        return new IntervalPitch(ratio);
    }

    get ratio(): Ratio {
        return this._ratio;
    }

    get cents(): number {
        if (this._ratio instanceof RatioPow2Frac)
            return (<RatioPow2Frac>this.ratio).cents;
        else
            return 1200 * Math.log2(this._ratio.value);
    }

    hashCode() {
        return this.ratio.value;
    }
}

export namespace IntervalPitch {
    export class COMMAS {
        static get SYNTONIC_COMMA(): IntervalPitch {
            if (!_SYNTONIC_COMMA)
                _SYNTONIC_COMMA = IntervalPitch.from(RatioFrac.from(81, 80));

            return _SYNTONIC_COMMA;
        }
        static get PYTHAGOREAN_COMMA(): IntervalPitch {
            initialize_pt_comma_IfNeeded();

            return _PT_COMMA;
        }
    }

    export class JUST {
        static get QUARTER_TONE(): IntervalPitch {
            if (!_JUST_QUARTER_TONE)
                _JUST_QUARTER_TONE = IntervalPitch.from(RatioFrac.from(246, 239));
            return _JUST_QUARTER_TONE;
        }
        static get MINOR_SECOND(): IntervalPitch {
            if (!_JUST_MINOR_SECOND)
                _JUST_MINOR_SECOND = IntervalPitch.from(RatioFrac.from(16, 15));
            return _JUST_MINOR_SECOND;
        }
        static get SEMITONE(): IntervalPitch {
            if (!_JUST_SEMITONE)
                _JUST_SEMITONE = IntervalPitch.JUST.MINOR_SECOND;
            return _JUST_SEMITONE;
        }
        static get DIMINISHED_THIRD(): IntervalPitch {
            if (!_JUST_DIMINISHED_THIRD)
                _JUST_DIMINISHED_THIRD = IntervalPitch.from(RatioFrac.from(256, 225));;
            return _JUST_DIMINISHED_THIRD;
        }
        static get MAJOR_TONE(): IntervalPitch {
            if (!_JUST_MAJOR_TONE)
                _JUST_MAJOR_TONE = IntervalPitch.PYTHAGOREAN.MAJOR_SECOND;
            return _JUST_MAJOR_TONE;
        }
        static get MINOR_TONE(): IntervalPitch {
            if (!_JUST_MINOR_TONE)
                _JUST_MINOR_TONE = IntervalPitch.from(RatioFrac.from(10, 9));
            return _JUST_MINOR_TONE;
        }
        static get AUGMENTED_SECOND(): IntervalPitch {
            if (!_JUST_AUGMENTED_SECOND)
                _JUST_AUGMENTED_SECOND = IntervalPitch.from(RatioFrac.from(75, 64));
            return _JUST_AUGMENTED_SECOND;
        }
        static get MINOR_THIRD(): IntervalPitch {
            if (!_JUST_MINOR_THIRD)
                _JUST_MINOR_THIRD = IntervalPitch.from(RatioFrac.from(6, 5));
            return _JUST_MINOR_THIRD;
        }
        static get MAJOR_THIRD(): IntervalPitch {
            if (!_JUST_MAJOR_THIRD)
                _JUST_MAJOR_THIRD = IntervalPitch.from(RatioFrac.from(5, 4));
            return _JUST_MAJOR_THIRD;
        }
        static get AUGMENTED_THIRD(): IntervalPitch {
            if (!_JUST_AUGMENTED_THIRD)
                _JUST_AUGMENTED_THIRD = IntervalPitch.from(RatioFrac.from(125, 96));
            return _JUST_AUGMENTED_THIRD;
        }
        static get PERFECT_FOURTH(): IntervalPitch {
            if (!_JUST_PERFECT_FOURTH)
                _JUST_PERFECT_FOURTH = IntervalPitch.PYTHAGOREAN.PERFECT_FOURTH;
            return _JUST_PERFECT_FOURTH;
        }
        static get AUGMENTED_FOURTH(): IntervalPitch {
            if (!_JUST_AUGMENTED_FOURTH)
                _JUST_AUGMENTED_FOURTH = IntervalPitch.from(RatioFrac.from(45, 32));
            return _JUST_AUGMENTED_FOURTH;
        }
        static get DIMINISHED_FIFTH(): IntervalPitch {
            if (!_JUST_DIMINISHED_FIFTH)
                _JUST_DIMINISHED_FIFTH = IntervalPitch.from(RatioFrac.from(36, 25));
            return _JUST_DIMINISHED_FIFTH;
        }
        static get TRITONE(): IntervalPitch {
            if (!_JUST_TRITONE)
                _JUST_TRITONE = IntervalPitch.from(RatioFrac.from(64, 45));
            return _JUST_TRITONE;
        }
        static get PERFECT_FIFTH(): IntervalPitch {
            if (!_JUST_PERFECT_FIFTH)
                _JUST_PERFECT_FIFTH = IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH;
            return _JUST_PERFECT_FIFTH;
        }
        static get AUGMENTED_FIFTH(): IntervalPitch {
            if (!_JUST_AUGMENTED_FIFTH)
                _JUST_AUGMENTED_FIFTH = IntervalPitch.from(RatioFrac.from(25, 16));
            return _JUST_AUGMENTED_FIFTH;
        }
        static get MINOR_SIXTH(): IntervalPitch {
            if (!_JUST_MINOR_SIXTH)
                _JUST_MINOR_SIXTH = IntervalPitch.from(RatioFrac.from(8, 5));
            return _JUST_MINOR_SIXTH;
        }
        static get MAJOR_SIXTH(): IntervalPitch {
            if (!_JUST_MAJOR_SIXTH)
                _JUST_MAJOR_SIXTH = IntervalPitch.from(RatioFrac.from(5, 3));
            return _JUST_MAJOR_SIXTH;
        }
        static get DIMINISHED_SEVENTH(): IntervalPitch {
            if (!_JUST_DIMINISHED_SEVENTH)
                _JUST_DIMINISHED_SEVENTH = IntervalPitch.from(RatioFrac.from(128, 75));
            return _JUST_DIMINISHED_SEVENTH;
        }
        static get AUGMENTED_SIXTH(): IntervalPitch {
            if (!_JUST_AUGMENTED_SIXTH)
                _JUST_AUGMENTED_SIXTH = IntervalPitch.from(RatioFrac.from(125, 72));
            return _JUST_AUGMENTED_SIXTH;
        }
        static get AUGMENTED_SIXTH2(): IntervalPitch {
            if (!_JUST_AUGMENTED_SIXTH2)
                _JUST_AUGMENTED_SIXTH2 = IntervalPitch.from(RatioFrac.from(225, 128));
            return _JUST_AUGMENTED_SIXTH2;
        }
        static get MINOR_SEVENTH_SMALL(): IntervalPitch {
            if (!_JUST_MINOR_SEVENTH_SMALL)
                _JUST_MINOR_SEVENTH_SMALL = IntervalPitch.PYTHAGOREAN.MINOR_SEVENTH;
            return _JUST_MINOR_SEVENTH_SMALL;
        }
        static get MINOR_SEVENTH_GREATER(): IntervalPitch {
            if (!_JUST_MINOR_SEVENTH_GREATER)
                _JUST_MINOR_SEVENTH_GREATER = IntervalPitch.from(RatioFrac.from(9, 5));
            return _JUST_MINOR_SEVENTH_GREATER;
        }
        static get MAJOR_SEVENTH(): IntervalPitch {
            if (!_JUST_MAJOR_SEVENTH)
                _JUST_MAJOR_SEVENTH = IntervalPitch.from(RatioFrac.from(15, 8));
            return _JUST_MAJOR_SEVENTH;
        }
        static get AUGMENTED_SEVENTH(): IntervalPitch {
            if (!_JUST_AUGMENTED_SEVENTH)
                _JUST_AUGMENTED_SEVENTH = IntervalPitch.from(RatioFrac.from(125, 64));
            return _JUST_AUGMENTED_SEVENTH;
        }
        static get PERFECT_TWELFTH(): IntervalPitch {
            if (!_JUST_PERFECT_TWELFTH)
                _JUST_PERFECT_TWELFTH = IntervalPitch.from(RatioFrac.from(3, 1));
            return _JUST_PERFECT_TWELFTH;
        }
    };

    export class ET12 {
        static get QUARTER_TONE(): IntervalPitch {
            if (!_ET12_QUARTER_TONE)
                _ET12_QUARTER_TONE = IntervalPitch.from(RatioPow2Frac.from(1, Chromatic.NUMBER * 2));
            return _ET12_QUARTER_TONE;
        }
        static get SEMITONE(): IntervalPitch {
            if (!_ET12_SEMITONE)
                _ET12_SEMITONE = IntervalPitch.from(RatioPow2Frac.fromCents(100));
            return _ET12_SEMITONE;
        }
        static get MINOR_SECOND(): IntervalPitch {
            if (!_ET12_MINOR_SECOND)
                _ET12_MINOR_SECOND = IntervalPitch.ET12.SEMITONE;
            return _ET12_MINOR_SECOND;
        }
        static get MAJOR_SECOND(): IntervalPitch {
            if (!_ET12_MAJOR_SECOND)
                _ET12_MAJOR_SECOND = IntervalPitch.from(RatioPow2Frac.fromCents(200));
            return _ET12_MAJOR_SECOND;
        }
        static get TONE(): IntervalPitch {
            if (!_ET12_TONE)
                _ET12_TONE = IntervalPitch.ET12.MAJOR_SECOND;
            return _ET12_TONE;
        }
        static get MINOR_THIRD(): IntervalPitch {
            if (!_ET12_MINOR_THIRD)
                _ET12_MINOR_THIRD = IntervalPitch.from(RatioPow2Frac.fromCents(300));
            return _ET12_MINOR_THIRD;
        }
        static get MAJOR_THIRD(): IntervalPitch {
            if (!_ET12_MAJOR_THIRD)
                _ET12_MAJOR_THIRD = IntervalPitch.from(RatioPow2Frac.fromCents(400));
            return _ET12_MAJOR_THIRD;
        }
        static get PERFECT_FOURTH(): IntervalPitch {
            if (!_ET12_PERFECT_FOURTH)
                _ET12_PERFECT_FOURTH = IntervalPitch.from(RatioPow2Frac.fromCents(500));
            return _ET12_PERFECT_FOURTH;
        }
        static get TRITONE(): IntervalPitch {
            if (!_ET12_TRITONE)
                _ET12_TRITONE = IntervalPitch.from(RatioPow2Frac.fromCents(600));
            return _ET12_TRITONE;
        }
        static get PERFECT_FIFTH(): IntervalPitch {
            if (!_ET12_PERFECT_FIFTH)
                _ET12_PERFECT_FIFTH = IntervalPitch.from(RatioPow2Frac.fromCents(700));
            return _ET12_PERFECT_FIFTH;
        }
        static get MINOR_SIXTH(): IntervalPitch {
            if (!_ET12_MINOR_SIXTH)
                _ET12_MINOR_SIXTH = IntervalPitch.from(RatioPow2Frac.fromCents(800));
            return _ET12_MINOR_SIXTH;
        }
        static get MAJOR_SIXTH(): IntervalPitch {
            if (!_ET12_MAJOR_SIXTH)
                _ET12_MAJOR_SIXTH = IntervalPitch.from(RatioPow2Frac.fromCents(900));
            return _ET12_MAJOR_SIXTH;
        }
        static get MINOR_SEVENTH(): IntervalPitch {
            if (!_ET12_MINOR_SEVENTH)
                _ET12_MINOR_SEVENTH = IntervalPitch.from(RatioPow2Frac.fromCents(1000));
            return _ET12_MINOR_SEVENTH;
        }
        static get MAJOR_SEVENTH(): IntervalPitch {
            if (!_ET12_MAJOR_SEVENTH)
                _ET12_MAJOR_SEVENTH = IntervalPitch.from(RatioPow2Frac.fromCents(1100));
            return _ET12_MAJOR_SEVENTH;
        }
    };

    export class PYTHAGOREAN {
        static get COMMA(): IntervalPitch {
            initialize_pt_comma_IfNeeded();
            return _PT_COMMA;
        }
        static get AUGMENTED_UNISON(): IntervalPitch {
            if (!_PT_AUGMENTED_UNISON)
                _PT_AUGMENTED_UNISON = IntervalPitch.from(RatioFrac.from(2187, 2048));
            return _PT_AUGMENTED_UNISON;
        }
        static get DIMINISHED_SECOND(): IntervalPitch {
            if (!_PT_DIMINISHED_SECOND)
                _PT_DIMINISHED_SECOND = IntervalPitch.from(RatioFrac.from(524288, 531441)); // lower than 1
            return _PT_DIMINISHED_SECOND;
        }
        static get MINOR_SECOND(): IntervalPitch {
            if (!_PT_MINOR_SECOND)
                _PT_MINOR_SECOND = IntervalPitch.from(RatioFrac.from(256, 243));
            return _PT_MINOR_SECOND;
        }
        static get DIMINISHED_THIRD(): IntervalPitch {
            if (!_PT_DIMINISHED_THIRD)
                _PT_DIMINISHED_THIRD = IntervalPitch.from(RatioFrac.from(65536, 59049));
            return _PT_DIMINISHED_THIRD;
        }
        static get MAJOR_SECOND(): IntervalPitch {
            if (!_PT_MAJOR_SECOND)
                _PT_MAJOR_SECOND = IntervalPitch.from(RatioFrac.from(9, 8));
            return _PT_MAJOR_SECOND;
        }
        static get MINOR_THIRD(): IntervalPitch {
            if (!_PT_MINOR_THIRD)
                _PT_MINOR_THIRD = IntervalPitch.from(RatioFrac.from(32, 27));
            return _PT_MINOR_THIRD;
        }
        static get AUGMENTED_SECOND(): IntervalPitch {
            if (!_PT_AUGMENTED_SECOND)
                _PT_AUGMENTED_SECOND = IntervalPitch.from(RatioFrac.from(19683, 16384));
            return _PT_AUGMENTED_SECOND;
        }
        static get DIMINISHED_FOURTH(): IntervalPitch {
            if (!_PT_DIMINISHED_FOURTH)
                _PT_DIMINISHED_FOURTH = IntervalPitch.from(RatioFrac.from(8192, 6561));
            return _PT_DIMINISHED_FOURTH;
        }
        static get MAJOR_THIRD(): IntervalPitch {
            if (!_PT_MAJOR_THIRD)
                _PT_MAJOR_THIRD = IntervalPitch.from(RatioFrac.from(81, 64));
            return _PT_MAJOR_THIRD;
        }
        static get PERFECT_FOURTH(): IntervalPitch {
            if (!_PT_PERFECT_FOURTH)
                _PT_PERFECT_FOURTH = IntervalPitch.from(RatioFrac.from(4, 3));
            return _PT_PERFECT_FOURTH;
        }
        static get AUGMENTED_THIRD(): IntervalPitch {
            if (!_PT_AUGMENTED_THIRD)
                _PT_AUGMENTED_THIRD = IntervalPitch.from(RatioFrac.from(177147, 131072));
            return _PT_AUGMENTED_THIRD;
        }
        static get DIMINISHED_FIFTH(): IntervalPitch {
            if (!_PT_DIMINISHED_FIFTH)
                _PT_DIMINISHED_FIFTH = IntervalPitch.from(RatioFrac.from(1024, 729));
            return _PT_DIMINISHED_FIFTH;
        }
        static get TRITONE(): IntervalPitch {
            if (!_PT_TRITONE)
                _PT_TRITONE = IntervalPitch.PYTHAGOREAN.DIMINISHED_FIFTH;
            return _PT_TRITONE;
        }
        static get AUGMENTED_FOURTH(): IntervalPitch {
            if (!_PT_AUGMENTED_FOURTH)
                _PT_AUGMENTED_FOURTH = IntervalPitch.from(RatioFrac.from(729, 512));
            return _PT_AUGMENTED_FOURTH;
        }
        static get DIMINISHED_SIXTH(): IntervalPitch {
            if (!_PT_DIMINISHED_SIXTH)
                _PT_DIMINISHED_SIXTH = IntervalPitch.from(RatioFrac.from(262144, 177147));
            return _PT_DIMINISHED_SIXTH;
        }
        static get PERFECT_FIFTH(): IntervalPitch {
            if (!_PT_PERFECT_FIFTH)
                _PT_PERFECT_FIFTH = IntervalPitch.from(RatioFrac.from(3, 2));
            return _PT_PERFECT_FIFTH;
        }
        static get MINOR_SIXTH(): IntervalPitch {
            if (!_PT_MINOR_SIXTH)
                _PT_MINOR_SIXTH = IntervalPitch.from(RatioFrac.from(128, 81));
            return _PT_MINOR_SIXTH;
        }
        static get AUGMENTED_FIFTH(): IntervalPitch {
            if (!_PT_AUGMENTED_FIFTH)
                _PT_AUGMENTED_FIFTH = IntervalPitch.from(RatioFrac.from(6561, 4096));
            return _PT_AUGMENTED_FIFTH;
        }
        static get DIMINISHED_SEVENTH(): IntervalPitch {
            if (!_PT_DIMINISHED_SEVENTH)
                _PT_DIMINISHED_SEVENTH = IntervalPitch.from(RatioFrac.from(32768, 19683));
            return _PT_DIMINISHED_SEVENTH;
        }
        static get MAJOR_SIXTH(): IntervalPitch {
            if (!_PT_MAJOR_SIXTH)
                _PT_MAJOR_SIXTH = IntervalPitch.from(RatioFrac.from(27, 16));
            return _PT_MAJOR_SIXTH;
        }
        static get MINOR_SEVENTH(): IntervalPitch {
            if (!_PT_MINOR_SEVENTH)
                _PT_MINOR_SEVENTH = IntervalPitch.from(RatioFrac.from(16, 9));;
            return _PT_MINOR_SEVENTH;
        }
        static get AUGMENTED_SIXTH(): IntervalPitch {
            if (!_PT_AUGMENTED_SIXTH)
                _PT_AUGMENTED_SIXTH = IntervalPitch.from(RatioFrac.from(59049, 32768));
            return _PT_AUGMENTED_SIXTH;
        }
        static get DIMINISHED_OCTAVE(): IntervalPitch {
            if (!_PT_DIMINISHED_OCTAVE)
                _PT_DIMINISHED_OCTAVE = IntervalPitch.from(RatioFrac.from(4096, 2187));
            return _PT_DIMINISHED_OCTAVE;
        }
        static get MAJOR_SEVENTH(): IntervalPitch {
            if (!_PT_MAJOR_SEVENTH)
                _PT_MAJOR_SEVENTH = IntervalPitch.from(RatioFrac.from(243, 128));
            return _PT_MAJOR_SEVENTH;
        }
        static get AUGMENTED_SEVENTH(): IntervalPitch {
            if (!_PT_AUGMENTED_SEVENTH)
                _PT_AUGMENTED_SEVENTH = IntervalPitch.from(RatioFrac.from(531441, 262144));
            return _PT_AUGMENTED_SEVENTH;
        }
    }
}

let _UNISON: IntervalPitch, _CENT: IntervalPitch, _OCTAVE: IntervalPitch;
let _JUST_QUARTER_TONE: IntervalPitch, _JUST_SEMITONE: IntervalPitch, _JUST_MINOR_SECOND: IntervalPitch, _JUST_DIMINISHED_THIRD: IntervalPitch, _JUST_MAJOR_TONE: IntervalPitch, _JUST_MINOR_TONE: IntervalPitch,
    _JUST_AUGMENTED_SECOND: IntervalPitch, _JUST_MINOR_THIRD: IntervalPitch, _JUST_MAJOR_THIRD: IntervalPitch, _JUST_AUGMENTED_THIRD: IntervalPitch, _JUST_PERFECT_FOURTH: IntervalPitch, _JUST_AUGMENTED_FOURTH: IntervalPitch,
    _JUST_DIMINISHED_FIFTH: IntervalPitch, _JUST_TRITONE: IntervalPitch, _JUST_PERFECT_FIFTH: IntervalPitch, _JUST_AUGMENTED_FIFTH: IntervalPitch, _JUST_MINOR_SIXTH: IntervalPitch, _JUST_MAJOR_SIXTH: IntervalPitch,
    _JUST_DIMINISHED_SEVENTH: IntervalPitch, _JUST_AUGMENTED_SIXTH: IntervalPitch, _JUST_AUGMENTED_SIXTH2: IntervalPitch, _JUST_MINOR_SEVENTH_SMALL: IntervalPitch, _JUST_MINOR_SEVENTH_GREATER: IntervalPitch,
    _JUST_MAJOR_SEVENTH: IntervalPitch, _JUST_AUGMENTED_SEVENTH: IntervalPitch, _JUST_PERFECT_TWELFTH: IntervalPitch;

let _ET12_QUARTER_TONE: IntervalPitch, _ET12_SEMITONE: IntervalPitch, _ET12_MINOR_SECOND: IntervalPitch, _ET12_MAJOR_SECOND: IntervalPitch, _ET12_TONE: IntervalPitch, _ET12_MINOR_THIRD: IntervalPitch, _ET12_MAJOR_THIRD: IntervalPitch,
    _ET12_PERFECT_FOURTH: IntervalPitch, _ET12_TRITONE: IntervalPitch, _ET12_PERFECT_FIFTH: IntervalPitch, _ET12_MINOR_SIXTH: IntervalPitch, _ET12_MAJOR_SIXTH: IntervalPitch, _ET12_MINOR_SEVENTH: IntervalPitch,
    _ET12_MAJOR_SEVENTH: IntervalPitch;

let _PT_COMMA: IntervalPitch, _SYNTONIC_COMMA: IntervalPitch;

let _PT_DIMINISHED_SECOND: IntervalPitch, _PT_MINOR_SECOND: IntervalPitch, _PT_AUGMENTED_UNISON: IntervalPitch, _PT_DIMINISHED_THIRD: IntervalPitch, _PT_MAJOR_SECOND: IntervalPitch,
    _PT_MINOR_THIRD: IntervalPitch, _PT_AUGMENTED_SECOND: IntervalPitch, _PT_DIMINISHED_FOURTH: IntervalPitch, _PT_MAJOR_THIRD: IntervalPitch, _PT_PERFECT_FOURTH: IntervalPitch,
    _PT_AUGMENTED_THIRD: IntervalPitch, _PT_DIMINISHED_FIFTH: IntervalPitch, _PT_AUGMENTED_FOURTH: IntervalPitch, _PT_TRITONE: IntervalPitch, _PT_DIMINISHED_SIXTH: IntervalPitch, _PT_PERFECT_FIFTH: IntervalPitch,
    _PT_MINOR_SIXTH: IntervalPitch, _PT_AUGMENTED_FIFTH: IntervalPitch, _PT_DIMINISHED_SEVENTH: IntervalPitch, _PT_MAJOR_SIXTH: IntervalPitch, _PT_MINOR_SEVENTH: IntervalPitch, _PT_AUGMENTED_SIXTH: IntervalPitch,
    _PT_DIMINISHED_OCTAVE: IntervalPitch, _PT_MAJOR_SEVENTH: IntervalPitch, _PT_AUGMENTED_SEVENTH: IntervalPitch;

function initialize_pt_comma_IfNeeded() {
    if (!_PT_COMMA)
        _PT_COMMA = IntervalPitch.from(RatioFrac.from(531441, 524288)); // lower than 1
}