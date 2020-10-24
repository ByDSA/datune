import { Chromatic } from "../degrees/Chromatic";
import { Ratio } from "./ratios/Ratio";
import { RatioFrac } from "./ratios/RatioFrac";
import { RatioNumber } from "./ratios/RatioNumber";
import { RatioPow2Frac } from "./ratios/RatioPow2Frac";

export class IntervalPitch {
    static UNISON: IntervalPitch;
    static OCTAVE: IntervalPitch;
    static CENT: IntervalPitch;

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
        static SYNTONIC_COMMA: IntervalPitch;
        static PYTHAGOREAN_COMMA: IntervalPitch;
    }

    export class JUST {
        static QUARTER_TONE: IntervalPitch;
        static MINOR_SECOND: IntervalPitch;
        static SEMITONE: IntervalPitch;
        static DIMINISHED_THIRD: IntervalPitch;
        static MAJOR_TONE: IntervalPitch;
        static MINOR_TONE: IntervalPitch;
        static AUGMENTED_SECOND: IntervalPitch;
        static MINOR_THIRD: IntervalPitch;
        static MAJOR_THIRD: IntervalPitch;
        static AUGMENTED_THIRD: IntervalPitch;
        static PERFECT_FOURTH: IntervalPitch;
        static AUGMENTED_FOURTH: IntervalPitch;
        static DIMINISHED_FIFTH: IntervalPitch;
        static TRITONE: IntervalPitch;
        static PERFECT_FIFTH: IntervalPitch;
        static AUGMENTED_FIFTH: IntervalPitch;
        static MINOR_SIXTH: IntervalPitch;
        static MAJOR_SIXTH: IntervalPitch;
        static DIMINISHED_SEVENTH: IntervalPitch;
        static AUGMENTED_SIXTH: IntervalPitch;
        static AUGMENTED_SIXTH2: IntervalPitch;
        static MINOR_SEVENTH_SMALL: IntervalPitch;
        static MINOR_SEVENTH_GREATER: IntervalPitch;
        static MAJOR_SEVENTH: IntervalPitch;
        static AUGMENTED_SEVENTH: IntervalPitch;
        static PERFECT_TWELFTH: IntervalPitch;
    };

    export class ET12 {
        static QUARTER_TONE: IntervalPitch;
        static SEMITONE: IntervalPitch;
        static MINOR_SECOND: IntervalPitch;
        static MAJOR_SECOND: IntervalPitch;
        static TONE: IntervalPitch;
        static MINOR_THIRD: IntervalPitch;
        static MAJOR_THIRD: IntervalPitch;
        static PERFECT_FOURTH: IntervalPitch;
        static TRITONE: IntervalPitch;
        static PERFECT_FIFTH: IntervalPitch;
        static MINOR_SIXTH: IntervalPitch;
        static MAJOR_SIXTH: IntervalPitch;
        static MINOR_SEVENTH: IntervalPitch;
        static MAJOR_SEVENTH: IntervalPitch;
    };

    export class PYTHAGOREAN {
        static COMMA: IntervalPitch;
        static AUGMENTED_UNISON: IntervalPitch;
        static DIMINISHED_SECOND: IntervalPitch;
        static MINOR_SECOND: IntervalPitch;
        static DIMINISHED_THIRD: IntervalPitch;
        static MAJOR_SECOND: IntervalPitch;
        static MINOR_THIRD: IntervalPitch;
        static AUGMENTED_SECOND: IntervalPitch;
        static DIMINISHED_FOURTH: IntervalPitch;
        static MAJOR_THIRD: IntervalPitch;
        static PERFECT_FOURTH: IntervalPitch;
        static AUGMENTED_THIRD: IntervalPitch;
        static DIMINISHED_FIFTH: IntervalPitch;
        static TRITONE: IntervalPitch;
        static AUGMENTED_FOURTH: IntervalPitch;
        static DIMINISHED_SIXTH: IntervalPitch;
        static PERFECT_FIFTH: IntervalPitch;
        static MINOR_SIXTH: IntervalPitch;
        static AUGMENTED_FIFTH: IntervalPitch;
        static DIMINISHED_SEVENTH: IntervalPitch;
        static MAJOR_SIXTH: IntervalPitch;
        static MINOR_SEVENTH: IntervalPitch;
        static AUGMENTED_SIXTH: IntervalPitch;
        static DIMINISHED_OCTAVE: IntervalPitch;
        static MAJOR_SEVENTH: IntervalPitch;
        static AUGMENTED_SEVENTH: IntervalPitch;
    }
}