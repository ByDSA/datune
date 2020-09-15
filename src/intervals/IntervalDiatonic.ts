import { Diatonic } from '../degrees/Diatonic';
import { IntervalSymbolic } from './IntervalSymbolic';
import { HashingObject, IntervalDiatonicCache } from './IntervalDiatonicCache';

export class IntervalDiatonic implements IntervalSymbolic<Diatonic> {
    static UNISON: IntervalDiatonic;
    static SECOND: IntervalDiatonic;
    static THIRD: IntervalDiatonic;
    static FOURTH: IntervalDiatonic;
    static FIFTH: IntervalDiatonic;
    static SIXTH: IntervalDiatonic;
    static SEVENTH: IntervalDiatonic;
    static OCTAVE: IntervalDiatonic;
    static NINTH: IntervalDiatonic;
    static TENTH: IntervalDiatonic;
    static ELEVENTH: IntervalDiatonic;
    static TWELFTH: IntervalDiatonic;
    static THIRTEENTH: IntervalDiatonic;
    static FOURTEENTH: IntervalDiatonic;
    static FIFTEENTH: IntervalDiatonic;

    private static _cache = new IntervalDiatonicCache((num: HashingObject) => new IntervalDiatonic(num));

    private constructor(private _number: number) {
    }

    static from(num: number) {
        if (num < 0)
            num = num % Diatonic.NUMBER + Diatonic.NUMBER;
        return IntervalDiatonic._cache.getOrCreate(num);
    }

    withAdd(interval: IntervalDiatonic): IntervalDiatonic {
        return IntervalDiatonic.from(this.valueOf() + interval.valueOf());
    }

    withSub(interval: IntervalDiatonic): IntervalDiatonic {
        return IntervalDiatonic.from(this.valueOf() - interval.valueOf());
    }

    valueOf(): number {
        return this._number;
    }

    toString(): string {
        switch (this) {
            case IntervalDiatonic.UNISON: return "UNISON";
            case IntervalDiatonic.SECOND: return "SECOND";
            case IntervalDiatonic.THIRD: return "THIRD";
            case IntervalDiatonic.FOURTH: return "FOURTH";
            case IntervalDiatonic.FIFTH: return "FIFTH";
            case IntervalDiatonic.SIXTH: return "SIXTH";
            case IntervalDiatonic.SEVENTH: return "SEVENTH";
            case IntervalDiatonic.OCTAVE: return "OCTAVE";
            case IntervalDiatonic.NINTH: return "NINTH";
            case IntervalDiatonic.TENTH: return "TENTH";
            case IntervalDiatonic.ELEVENTH: return "ELEVENTH";
            case IntervalDiatonic.TWELFTH: return "TWELFTH";
            case IntervalDiatonic.THIRTEENTH: return "THIRTEENTH";
            case IntervalDiatonic.FOURTEENTH: return "FOURTEENTH";
            case IntervalDiatonic.FIFTEENTH: return "FIFTEENTH";
        }

        return "IntervalDiatonic: " + this.valueOf();
    }
}