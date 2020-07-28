import { Assert } from '../common/Assert';
import { rotativeTrim } from '../common/MathUtils';
import { PrecalcCache } from '../common/PrecalcCache';
import { Chromatic } from '../degrees/Chromatic';
import { Diatonic } from '../degrees/Diatonic';
import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { IntervalDiatonic } from './IntervalDiatonic';
import { IntervalSymbolic } from './IntervalSymbolic';
import { Quality } from './Quality';

const SemisMajor = [0, 2, 4, 5, 7, 9, 11];
type HashingObject = { interval: IntervalDiatonic, quality: Quality };

export class IntervalDiatonicAlt implements IntervalSymbolic<DiatonicAlt> {
    // precalc

    public static PERFECT_UNISON;
    public static DIMINISHED_SECOND;
    public static MINOR_SECOND;
    public static AUGMENTED_UNISON;
    public static DOUBLY_AUGMENTED_UNISON;
    public static MAJOR_SECOND;
    public static DOUBLY_DIMINISHED_THIRD;
    public static DIMINISHED_THIRD;
    public static MINOR_THIRD;
    public static AUGMENTED_SECOND;
    public static DOUBLY_AUGMENTED_SECOND;
    public static MAJOR_THIRD;
    public static DIMINISHED_FOURTH;
    public static DOUBLY_DIMINISHED_FOURTH;
    public static PERFECT_FOURTH;
    public static AUGMENTED_THIRD;
    public static DOUBLY_AUGMENTED_THIRD;
    public static DIMINISHED_FIFTH;
    public static DOUBLY_DIMINISHED_FIFTH;
    public static AUGMENTED_FOURTH;
    public static DOUBLY_AUGMENTED_FOURTH;
    public static PERFECT_FIFTH;
    public static DIMINISHED_SIXTH;
    public static DOUBLY_DIMINISHED_SIXTH;
    public static MINOR_SIXTH;
    public static AUGMENTED_FIFTH;
    public static DOUBLY_AUGMENTED_FIFTH;
    public static MAJOR_SIXTH;
    public static DIMINISHED_SEVENTH;
    public static DOUBLY_DIMINISHED_SEVENTH;
    public static MINOR_SEVENTH;
    public static AUGMENTED_SIXTH;
    public static DOUBLY_AUGMENTED_SIXTH;
    public static MAJOR_SEVENTH;
    public static DIMINISHED_OCTAVE;
    public static DOUBLY_DIMINISHED_OCTAVE;
    public static PERFECT_OCTAVE;
    public static AUGMENTED_SEVENTH;
    public static DOUBLY_AUGMENTED_SEVENTH;
    public static DIMINISHED_NINTH;
    public static DOUBLY_DIMINISHED_NINTH;
    public static MINOR_NINTH;
    public static AUGMENTED_OCTAVE;
    public static DOUBLY_AUGMENTED_OCTAVE;
    public static MAJOR_NINTH;
    public static DIMINISHED_TENTH;
    public static DOUBLY_DIMINISHED_TENTH;
    public static MINOR_TENTH;
    public static AUGMENTED_NINTH;
    public static DOUBLY_AUGMENTED_NINTH;
    public static MAJOR_TENTH;
    public static DIMINISHED_ELEVENTH;
    public static DOUBLY_DIMINISHED_ELEVENTH;
    public static PERFECT_ELEVENTH;
    public static AUGMENTED_TENTH;
    public static DOUBLY_AUGMENTED_TENTH;
    public static DIMINISHED_TWELFTH;
    public static DOUBLY_DIMINISHED_TWELFTH;
    public static AUGMENTED_ELEVENTH;
    public static DOUBLY_AUGMENTED_ELEVENTH;
    public static PERFECT_TWELFTH;
    public static DIMINISHED_THIRTEENTH;
    public static DOUBLY_DIMINISHED_THIRTEENTH;
    public static MINOR_THIRTEENTH;
    public static AUGMENTED_TWELFTH;
    public static DOUBLY_AUGMENTED_TWELFTH;
    public static MAJOR_THIRTEENTH;
    public static DIMINISHED_FOURTEENTH;
    public static DOUBLY_DIMINISHED_FOURTEENTH;
    public static MINOR_FOURTEENTH;
    public static AUGMENTED_THIRTEENTH;
    public static DOUBLY_AUGMENTED_THIRTEENTH;
    public static MAJOR_FOURTEENTH;
    public static DIMINISHED_FIFTEENTH;
    public static DOUBLY_DIMINISHED_FIFTEENTH;
    public static PERFECT_FIFTEENTH;
    public static AUGMENTED_FOURTEENTH;
    public static DOUBLY_AUGMENTED_FOURTEENTH;
    public static AUGMENTED_FIFTEENTH;
    public static DOUBLY_AUGMENTED_FIFTEENTH;

    private _intervalChromatic: number = null;

    private static _cache = new (class Cache extends PrecalcCache<IntervalDiatonicAlt, HashingObject>{
        getHash(hashingObject: HashingObject): string {
            return hashingObject.interval + "|" + hashingObject.quality.shortName;
        }

        getHashingObject(intervalDiatonicAlt: IntervalDiatonicAlt): HashingObject {
            return { interval: intervalDiatonicAlt.intervalDiatonic, quality: intervalDiatonicAlt.quality };
        }

        create(hashingObject: HashingObject): IntervalDiatonicAlt {
            return new IntervalDiatonicAlt(hashingObject.interval, hashingObject.quality);
        }
    });

    private constructor(private _intervalDiatonic, private quality: Quality) {
    }

    static from(intervalDiatonic: IntervalDiatonic, quality: Quality): IntervalDiatonicAlt {
        return this._cache.getOrCreate({ interval: intervalDiatonic, quality: quality });
    }

    public static between(diatonicAlt1: DiatonicAlt, diatonicAlt2: DiatonicAlt) {
        let intervalDiatonic: IntervalDiatonic = IntervalDiatonic.from(diatonicAlt2.diatonic.intValue - diatonicAlt1.diatonic.intValue);

        let intervalChromatic = diatonicAlt2.chromatic.intValue - diatonicAlt1.chromatic.intValue;
        intervalChromatic = rotativeTrim(intervalChromatic, Chromatic.NUMBER);

        return this.fromIntervals(intervalChromatic, intervalDiatonic);
    }

    public static betweenChromatic(chromatic1: Chromatic, chromatic2: Chromatic) {
        let diatonicAlt1 = DiatonicAlt.fromChromatic(chromatic1);
        let diatonicAlt2 = DiatonicAlt.fromChromatic(chromatic2);

        return this.between(diatonicAlt1, diatonicAlt2);
    }

    public getAdd(interval: IntervalDiatonicAlt): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.fromIntervals(this.intervalChromatic + interval.intervalChromatic, this.intervalDiatonic.getAdd(interval.intervalDiatonic));
    }

    public getSub(interval: IntervalDiatonicAlt): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.fromIntervals(this.intervalChromatic - interval.intervalChromatic, this.intervalDiatonic.getSub(interval.intervalDiatonic));
    }

    public static fromIntervals(intervalChromatic: number, intervalDiatonic: IntervalDiatonic): IntervalDiatonicAlt {
        Assert.notNull(intervalChromatic);
        Assert.notNull(intervalDiatonic);

        let numInOctave: number = intervalDiatonic.intValue % Diatonic.NUMBER;

        let diff = intervalChromatic % Chromatic.NUMBER - SemisMajor[numInOctave];
        switch (numInOctave) {
            case IntervalDiatonic.UNISON.intValue:
            case IntervalDiatonic.FOURTH.intValue:
            case IntervalDiatonic.FIFTH.intValue:
                switch (diff) {
                    case 0:
                        return IntervalDiatonicAlt.from(intervalDiatonic, Quality.PERFECT);
                    case -1:
                        return IntervalDiatonicAlt.from(intervalDiatonic, Quality.DIMINISHED);
                    case -2:
                        return IntervalDiatonicAlt.from(intervalDiatonic, Quality.DOUBLY_DIMINISHED);
                    case 1:
                        return IntervalDiatonicAlt.from(intervalDiatonic, Quality.AUGMENTED);
                    case 2:
                        return IntervalDiatonicAlt.from(intervalDiatonic, Quality.DOUBLY_AUGMENTED);
                }
                break;
            case IntervalDiatonic.SECOND.intValue:
            case IntervalDiatonic.THIRD.intValue:
            case IntervalDiatonic.SIXTH.intValue:
            case IntervalDiatonic.SEVENTH.intValue:
                switch (diff) {
                    case 0:
                        return IntervalDiatonicAlt.from(intervalDiatonic, Quality.MAJOR);
                    case -1:
                        return IntervalDiatonicAlt.from(intervalDiatonic, Quality.MINOR);
                    case -2:
                        return IntervalDiatonicAlt.from(intervalDiatonic, Quality.DIMINISHED);
                    case 1:
                        return IntervalDiatonicAlt.from(intervalDiatonic, Quality.AUGMENTED);
                    case 2:
                        return IntervalDiatonicAlt.from(intervalDiatonic, Quality.DOUBLY_AUGMENTED);
                }
        }

        throw new Error("Cannot get IntervalDiatonicAlt from IntervalChromatic=" + intervalChromatic + ", IntervalDiatonic=" + intervalDiatonic);
    }

    static fromString(str: string): IntervalDiatonicAlt {
        let splited = this.splitLettersNumbers(str);
        if (!splited)
            return null;

        let intervalDiatonic = IntervalDiatonic.from(splited.n - 1);
        let quality = Quality.fromString(splited.str);
        if (!quality || !intervalDiatonic)
            return null;

        return this.from(intervalDiatonic, quality);
    }

    private static splitLettersNumbers(str: string): { str: string, n: number } {
        if (str.length == 0)
            return null;

        let splitPos = this.getSplitLettersNumberPos(str);

        if (splitPos >= str.length)
            return null;

        let retStr = str.substr(0, splitPos);
        let retN = +str.substr(splitPos);

        if (isNaN(retN))
            return null;

        return { str: retStr, n: retN }
    }

    private static getSplitLettersNumberPos(str: string): number {
        let splitPos;
        for (splitPos = 0; splitPos < str.length; splitPos++) {
            if (!isNaN(+str[splitPos]))
                break;
        }

        return splitPos;
    }

    private precalculateSemis() {
        let rootIntervalDiatonicIntValue: number = this.intervalDiatonic.intValue % Diatonic.NUMBER;
        let octaves: number = Math.floor(this.intervalDiatonic.intValue / Diatonic.NUMBER);

        let rootIntervalChromatic = SemisMajor[rootIntervalDiatonicIntValue];
        switch (rootIntervalDiatonicIntValue) {
            case IntervalDiatonic.UNISON.intValue:
            case IntervalDiatonic.FOURTH.intValue:
            case IntervalDiatonic.FIFTH.intValue:
                switch (this.quality) {
                    case Quality.DIMINISHED:
                        rootIntervalChromatic--;
                        break;
                    case Quality.AUGMENTED:
                        rootIntervalChromatic++;
                        break;
                    case Quality.DOUBLY_DIMINISHED:
                        rootIntervalChromatic -= 2;
                        break;
                    case Quality.DOUBLY_AUGMENTED:
                        rootIntervalChromatic += 2;
                        break;
                }
                break;
            case IntervalDiatonic.SECOND.intValue:
            case IntervalDiatonic.THIRD.intValue:
            case IntervalDiatonic.SIXTH.intValue:
            case IntervalDiatonic.SEVENTH.intValue:
                switch (this.quality) {
                    case Quality.MINOR:
                        rootIntervalChromatic--;
                        break;
                    case Quality.DIMINISHED:
                        rootIntervalChromatic -= 2;
                        break;
                    case Quality.AUGMENTED:
                        rootIntervalChromatic++;
                        break;
                }
        }

        rootIntervalChromatic += Chromatic.NUMBER * octaves;

        this._intervalChromatic = rootIntervalChromatic;
    }

    get intervalChromatic(): number {
        if (this._intervalChromatic === null) {
            this.precalculateSemis();
        }
        return this._intervalChromatic;
    }

    get intervalDiatonic(): IntervalDiatonic {
        return this._intervalDiatonic;
    }

    get alts() {
        return this.intervalChromatic - Diatonic.fromInt(this.intervalDiatonic.intValue).chromatic.intValue;
    }

    toString(): string {
        let ret = this.quality.shortName;

        ret += (this.intervalDiatonic.intValue + 1);

        return ret;
    }

    hashCode(): string {
        return "d:" + this.intervalDiatonic + "s:" + this.intervalChromatic;
    }

    private static initialize() {
        this.PERFECT_UNISON = IntervalDiatonicAlt.from(IntervalDiatonic.UNISON, Quality.PERFECT);
        this.DIMINISHED_SECOND = IntervalDiatonicAlt.from(IntervalDiatonic.SECOND, Quality.DIMINISHED);
        this.MINOR_SECOND = IntervalDiatonicAlt.from(IntervalDiatonic.SECOND, Quality.MINOR);
        this.AUGMENTED_UNISON = IntervalDiatonicAlt.from(IntervalDiatonic.UNISON, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_UNISON = IntervalDiatonicAlt.from(IntervalDiatonic.UNISON, Quality.DOUBLY_AUGMENTED);
        this.MAJOR_SECOND = IntervalDiatonicAlt.from(IntervalDiatonic.SECOND, Quality.MAJOR);
        this.DIMINISHED_THIRD = IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.DIMINISHED);
        this.DOUBLY_DIMINISHED_THIRD = IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.DOUBLY_DIMINISHED);
        this.MINOR_THIRD = IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.MINOR);
        this.AUGMENTED_SECOND = IntervalDiatonicAlt.from(IntervalDiatonic.SECOND, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_SECOND = IntervalDiatonicAlt.from(IntervalDiatonic.SECOND, Quality.DOUBLY_AUGMENTED);
        this.MAJOR_THIRD = IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.MAJOR);
        this.DIMINISHED_FOURTH = IntervalDiatonicAlt.from(IntervalDiatonic.FOURTH, Quality.DIMINISHED);
        this.DOUBLY_DIMINISHED_FOURTH = IntervalDiatonicAlt.from(IntervalDiatonic.FOURTH, Quality.DOUBLY_DIMINISHED);
        this.PERFECT_FOURTH = IntervalDiatonicAlt.from(IntervalDiatonic.FOURTH, Quality.PERFECT);
        this.AUGMENTED_THIRD = IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_THIRD = IntervalDiatonicAlt.from(IntervalDiatonic.THIRD, Quality.DOUBLY_AUGMENTED);
        this.DIMINISHED_FIFTH = IntervalDiatonicAlt.from(IntervalDiatonic.FIFTH, Quality.DIMINISHED);
        this.DOUBLY_DIMINISHED_FIFTH = IntervalDiatonicAlt.from(IntervalDiatonic.FIFTH, Quality.DOUBLY_DIMINISHED);
        this.AUGMENTED_FOURTH = IntervalDiatonicAlt.from(IntervalDiatonic.FOURTH, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_FOURTH = IntervalDiatonicAlt.from(IntervalDiatonic.FOURTH, Quality.DOUBLY_AUGMENTED);
        this.PERFECT_FIFTH = IntervalDiatonicAlt.from(IntervalDiatonic.FIFTH, Quality.PERFECT);
        this.DIMINISHED_SIXTH = IntervalDiatonicAlt.from(IntervalDiatonic.SIXTH, Quality.DIMINISHED);
        this.DOUBLY_DIMINISHED_SIXTH = IntervalDiatonicAlt.from(IntervalDiatonic.SIXTH, Quality.DOUBLY_DIMINISHED);
        this.MINOR_SIXTH = IntervalDiatonicAlt.from(IntervalDiatonic.SIXTH, Quality.MINOR);
        this.AUGMENTED_FIFTH = IntervalDiatonicAlt.from(IntervalDiatonic.FIFTH, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_FIFTH = IntervalDiatonicAlt.from(IntervalDiatonic.FIFTH, Quality.DOUBLY_AUGMENTED);
        this.MAJOR_SIXTH = IntervalDiatonicAlt.from(IntervalDiatonic.SIXTH, Quality.MAJOR);
        this.DIMINISHED_SEVENTH = IntervalDiatonicAlt.from(IntervalDiatonic.SEVENTH, Quality.DIMINISHED);
        this.DOUBLY_DIMINISHED_SEVENTH = IntervalDiatonicAlt.from(IntervalDiatonic.SEVENTH, Quality.DOUBLY_DIMINISHED);
        this.MINOR_SEVENTH = IntervalDiatonicAlt.from(IntervalDiatonic.SEVENTH, Quality.MINOR);
        this.AUGMENTED_SIXTH = IntervalDiatonicAlt.from(IntervalDiatonic.SIXTH, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_SIXTH = IntervalDiatonicAlt.from(IntervalDiatonic.SIXTH, Quality.DOUBLY_AUGMENTED);
        this.MAJOR_SEVENTH = IntervalDiatonicAlt.from(IntervalDiatonic.SEVENTH, Quality.MAJOR);
        this.DIMINISHED_OCTAVE = IntervalDiatonicAlt.from(IntervalDiatonic.OCTAVE, Quality.DIMINISHED);
        this.DOUBLY_DIMINISHED_OCTAVE = IntervalDiatonicAlt.from(IntervalDiatonic.OCTAVE, Quality.DOUBLY_DIMINISHED);
        this.PERFECT_OCTAVE = IntervalDiatonicAlt.from(IntervalDiatonic.OCTAVE, Quality.PERFECT);
        this.AUGMENTED_SEVENTH = IntervalDiatonicAlt.from(IntervalDiatonic.SEVENTH, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_SEVENTH = IntervalDiatonicAlt.from(IntervalDiatonic.SEVENTH, Quality.DOUBLY_AUGMENTED);
        this.DIMINISHED_NINTH = IntervalDiatonicAlt.from(IntervalDiatonic.NINTH, Quality.DIMINISHED);
        this.DOUBLY_DIMINISHED_NINTH = IntervalDiatonicAlt.from(IntervalDiatonic.NINTH, Quality.DOUBLY_DIMINISHED);
        this.MINOR_NINTH = IntervalDiatonicAlt.from(IntervalDiatonic.NINTH, Quality.MINOR);
        this.AUGMENTED_OCTAVE = IntervalDiatonicAlt.from(IntervalDiatonic.OCTAVE, Quality.AUGMENTED);
        this.MAJOR_NINTH = IntervalDiatonicAlt.from(IntervalDiatonic.NINTH, Quality.MAJOR);
        this.DIMINISHED_TENTH = IntervalDiatonicAlt.from(IntervalDiatonic.TENTH, Quality.DIMINISHED);
        this.DOUBLY_DIMINISHED_TENTH = IntervalDiatonicAlt.from(IntervalDiatonic.TENTH, Quality.DOUBLY_DIMINISHED);
        this.MINOR_TENTH = IntervalDiatonicAlt.from(IntervalDiatonic.TENTH, Quality.MINOR);
        this.AUGMENTED_NINTH = IntervalDiatonicAlt.from(IntervalDiatonic.NINTH, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_NINTH = IntervalDiatonicAlt.from(IntervalDiatonic.NINTH, Quality.DOUBLY_AUGMENTED);
        this.MAJOR_TENTH = IntervalDiatonicAlt.from(IntervalDiatonic.TENTH, Quality.MAJOR);
        this.DIMINISHED_ELEVENTH = IntervalDiatonicAlt.from(IntervalDiatonic.ELEVENTH, Quality.DIMINISHED);
        this.DOUBLY_DIMINISHED_ELEVENTH = IntervalDiatonicAlt.from(IntervalDiatonic.ELEVENTH, Quality.DOUBLY_DIMINISHED);
        this.PERFECT_ELEVENTH = IntervalDiatonicAlt.from(IntervalDiatonic.ELEVENTH, Quality.MINOR);
        this.AUGMENTED_TENTH = IntervalDiatonicAlt.from(IntervalDiatonic.TENTH, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_TENTH = IntervalDiatonicAlt.from(IntervalDiatonic.TENTH, Quality.DOUBLY_AUGMENTED);
        this.DIMINISHED_TWELFTH = IntervalDiatonicAlt.from(IntervalDiatonic.TWELFTH, Quality.DIMINISHED);
        this.DOUBLY_DIMINISHED_TWELFTH = IntervalDiatonicAlt.from(IntervalDiatonic.TWELFTH, Quality.DOUBLY_DIMINISHED);
        this.AUGMENTED_ELEVENTH = IntervalDiatonicAlt.from(IntervalDiatonic.ELEVENTH, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_ELEVENTH = IntervalDiatonicAlt.from(IntervalDiatonic.ELEVENTH, Quality.DOUBLY_AUGMENTED);
        this.PERFECT_TWELFTH = IntervalDiatonicAlt.from(IntervalDiatonic.TWELFTH, Quality.PERFECT);
        this.DIMINISHED_THIRTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.THIRTEENTH, Quality.DIMINISHED);
        this.DOUBLY_DIMINISHED_THIRTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.THIRTEENTH, Quality.DOUBLY_DIMINISHED);
        this.MINOR_THIRTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.THIRTEENTH, Quality.MINOR);
        this.AUGMENTED_TWELFTH = IntervalDiatonicAlt.from(IntervalDiatonic.TWELFTH, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_TWELFTH = IntervalDiatonicAlt.from(IntervalDiatonic.TWELFTH, Quality.DOUBLY_AUGMENTED);
        this.MAJOR_THIRTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.THIRTEENTH, Quality.MAJOR);
        this.DIMINISHED_FOURTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.FOURTEENTH, Quality.DIMINISHED);
        this.DOUBLY_DIMINISHED_FOURTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.FOURTEENTH, Quality.DOUBLY_DIMINISHED);
        this.MINOR_FOURTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.FOURTEENTH, Quality.MINOR);
        this.AUGMENTED_THIRTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.THIRTEENTH, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_THIRTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.THIRTEENTH, Quality.DOUBLY_AUGMENTED);
        this.MAJOR_FOURTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.FOURTEENTH, Quality.MAJOR);
        this.DIMINISHED_FIFTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.FIFTEENTH, Quality.DIMINISHED);
        this.DOUBLY_DIMINISHED_FIFTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.FIFTEENTH, Quality.DOUBLY_DIMINISHED);
        this.PERFECT_FIFTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.FIFTEENTH, Quality.PERFECT);
        this.AUGMENTED_FOURTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.FOURTEENTH, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_FOURTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.FOURTEENTH, Quality.DOUBLY_AUGMENTED);
        this.AUGMENTED_FIFTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.FIFTEENTH, Quality.AUGMENTED);
        this.DOUBLY_AUGMENTED_FIFTEENTH = IntervalDiatonicAlt.from(IntervalDiatonic.FIFTEENTH, Quality.DOUBLY_AUGMENTED);
    }
}