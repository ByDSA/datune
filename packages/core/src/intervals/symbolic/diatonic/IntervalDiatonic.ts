import { Diatonic } from '../../../pitches';
import { HashingObject, IntervalDiatonicCache } from './building/cache/IntervalDiatonicCache';

export class IntervalDiatonic {
    // sets

    static get UNISON(): IntervalDiatonic {
        return IntervalDiatonic.from(0);
    }
    static get SECOND(): IntervalDiatonic {
        return IntervalDiatonic.from(1);
    }
    static get THIRD(): IntervalDiatonic {
        return IntervalDiatonic.from(2);
    }
    static get FOURTH(): IntervalDiatonic {
        return IntervalDiatonic.from(3);
    }
    static get FIFTH(): IntervalDiatonic {
        return IntervalDiatonic.from(4);
    }
    static get SIXTH(): IntervalDiatonic {
        return IntervalDiatonic.from(5);
    }
    static get SEVENTH(): IntervalDiatonic {
        return IntervalDiatonic.from(6);
    }
    static get OCTAVE(): IntervalDiatonic {
        return IntervalDiatonic.from(7);
    }
    static get NINTH(): IntervalDiatonic {
        return IntervalDiatonic.from(8);
    }
    static get TENTH(): IntervalDiatonic {
        return IntervalDiatonic.from(9);
    }
    static get ELEVENTH(): IntervalDiatonic {
        return IntervalDiatonic.from(10);
    }
    static get TWELFTH(): IntervalDiatonic {
        return IntervalDiatonic.from(11);
    }
    static get THIRTEENTH(): IntervalDiatonic {
        return IntervalDiatonic.from(12);
    }
    static get FOURTEENTH(): IntervalDiatonic {
        return IntervalDiatonic.from(13);
    }
    static get FIFTEENTH(): IntervalDiatonic {
        return IntervalDiatonic.from(14);
    }

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