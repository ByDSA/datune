import { MusicalDuration, RhythmPattern } from "../../../../time";
import { RhythmArray } from "../pattern/RhythmArray";

export class TimeSignature {
    static _4_4 = TimeSignature.fromFrac(4);
    static _3_4 = TimeSignature.fromFrac(3);

    private _numerators: number[];
    private _precalcNumerator: number | undefined;
    private _denominator: number;
    private _denominatorBeat: MusicalDuration;

    private constructor(nums: number[], beat: MusicalDuration) {
        this._denominator = _musicalDurationToDen(beat);
        this._denominatorBeat = beat;
        this._numerators = nums;
    }

    static fromAdditive(nums: number[], beat: MusicalDuration = MusicalDuration.QUARTER) {
        return new TimeSignature(nums, beat);
    }

    static fromRhythmArray(a: RhythmArray, beat: MusicalDuration = MusicalDuration.QUARTER) {
        const pattern = RhythmPattern.fromArray(...a);
        return this.fromPattern(pattern, beat);
    }

    static fromPattern(a: RhythmPattern, beat: MusicalDuration = MusicalDuration.QUARTER) {
        return new TimeSignature(a.values, beat);
    }

    static fromFrac(n: number, d: number = 4) {
        const beat = MusicalDuration.from(1 / d);
        return new TimeSignature([n], beat);
    }

    get numerator(): number {
        if (!this._precalcNumerator) {
            this._precalcNumerator = this._calcNumerator();
            Object.freeze(this._precalcNumerator);
        }

        return this._precalcNumerator;
    }

    get numerators(): number[] {
        return this._numerators;
    }

    get denominator(): number {
        return this._denominator;
    }

    get denominatorBeat(): MusicalDuration {
        return this._denominatorBeat;
    }

    private _calcNumerator(): number {
        return this._numerators.reduce((p, c) => p + c);
    }
}

function _musicalDurationToDen(md: MusicalDuration): number {
    return 1 / md.value;
}