import { rotativeTrim } from '../common/MathUtils';
import { Chromatic } from '../degrees/Chromatic';
import { Diatonic } from '../degrees/Diatonic';
import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { IntervalDiatonic } from './IntervalDiatonic';
import { IntervalSymbolic } from './IntervalSymbolic';
import { Quality } from './Quality';
import { HashingObject, IntervalDiatonicAltCache } from './IntervalDiatonicAltCache';

const SemisMajor = [0, 2, 4, 5, 7, 9, 11];
export class IntervalDiatonicAlt implements IntervalSymbolic<DiatonicAlt> {
    // precalc

    static PERFECT_UNISON: IntervalDiatonicAlt;
    static DIMINISHED_SECOND: IntervalDiatonicAlt;
    static MINOR_SECOND: IntervalDiatonicAlt;
    static AUGMENTED_UNISON: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_UNISON: IntervalDiatonicAlt;
    static MAJOR_SECOND: IntervalDiatonicAlt;
    static DOUBLY_DIMINISHED_THIRD: IntervalDiatonicAlt;
    static DIMINISHED_THIRD: IntervalDiatonicAlt;
    static MINOR_THIRD: IntervalDiatonicAlt;
    static AUGMENTED_SECOND: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_SECOND: IntervalDiatonicAlt;
    static MAJOR_THIRD: IntervalDiatonicAlt;
    static DIMINISHED_FOURTH: IntervalDiatonicAlt;
    static DOUBLY_DIMINISHED_FOURTH: IntervalDiatonicAlt;
    static PERFECT_FOURTH: IntervalDiatonicAlt;
    static AUGMENTED_THIRD: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_THIRD: IntervalDiatonicAlt;
    static DIMINISHED_FIFTH: IntervalDiatonicAlt;
    static DOUBLY_DIMINISHED_FIFTH: IntervalDiatonicAlt;
    static AUGMENTED_FOURTH: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_FOURTH: IntervalDiatonicAlt;
    static PERFECT_FIFTH: IntervalDiatonicAlt;
    static DIMINISHED_SIXTH: IntervalDiatonicAlt;
    static DOUBLY_DIMINISHED_SIXTH: IntervalDiatonicAlt;
    static MINOR_SIXTH: IntervalDiatonicAlt;
    static AUGMENTED_FIFTH: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_FIFTH: IntervalDiatonicAlt;
    static MAJOR_SIXTH: IntervalDiatonicAlt;
    static DIMINISHED_SEVENTH: IntervalDiatonicAlt;
    static DOUBLY_DIMINISHED_SEVENTH: IntervalDiatonicAlt;
    static MINOR_SEVENTH: IntervalDiatonicAlt;
    static AUGMENTED_SIXTH: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_SIXTH: IntervalDiatonicAlt;
    static MAJOR_SEVENTH: IntervalDiatonicAlt;
    static DIMINISHED_OCTAVE: IntervalDiatonicAlt;
    static DOUBLY_DIMINISHED_OCTAVE: IntervalDiatonicAlt;
    static PERFECT_OCTAVE: IntervalDiatonicAlt;
    static AUGMENTED_SEVENTH: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_SEVENTH: IntervalDiatonicAlt;
    static DIMINISHED_NINTH: IntervalDiatonicAlt;
    static DOUBLY_DIMINISHED_NINTH: IntervalDiatonicAlt;
    static MINOR_NINTH: IntervalDiatonicAlt;
    static AUGMENTED_OCTAVE: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_OCTAVE: IntervalDiatonicAlt;
    static MAJOR_NINTH: IntervalDiatonicAlt;
    static DIMINISHED_TENTH: IntervalDiatonicAlt;
    static DOUBLY_DIMINISHED_TENTH: IntervalDiatonicAlt;
    static MINOR_TENTH: IntervalDiatonicAlt;
    static AUGMENTED_NINTH: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_NINTH: IntervalDiatonicAlt;
    static MAJOR_TENTH: IntervalDiatonicAlt;
    static DIMINISHED_ELEVENTH: IntervalDiatonicAlt;
    static DOUBLY_DIMINISHED_ELEVENTH: IntervalDiatonicAlt;
    static PERFECT_ELEVENTH: IntervalDiatonicAlt;
    static AUGMENTED_TENTH: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_TENTH: IntervalDiatonicAlt;
    static DIMINISHED_TWELFTH: IntervalDiatonicAlt;
    static DOUBLY_DIMINISHED_TWELFTH: IntervalDiatonicAlt;
    static AUGMENTED_ELEVENTH: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_ELEVENTH: IntervalDiatonicAlt;
    static PERFECT_TWELFTH: IntervalDiatonicAlt;
    static DIMINISHED_THIRTEENTH: IntervalDiatonicAlt;
    static DOUBLY_DIMINISHED_THIRTEENTH: IntervalDiatonicAlt;
    static MINOR_THIRTEENTH: IntervalDiatonicAlt;
    static AUGMENTED_TWELFTH: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_TWELFTH: IntervalDiatonicAlt;
    static MAJOR_THIRTEENTH: IntervalDiatonicAlt;
    static DIMINISHED_FOURTEENTH: IntervalDiatonicAlt;
    static DOUBLY_DIMINISHED_FOURTEENTH: IntervalDiatonicAlt;
    static MINOR_FOURTEENTH: IntervalDiatonicAlt;
    static AUGMENTED_THIRTEENTH: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_THIRTEENTH: IntervalDiatonicAlt;
    static MAJOR_FOURTEENTH: IntervalDiatonicAlt;
    static DIMINISHED_FIFTEENTH: IntervalDiatonicAlt;
    static DOUBLY_DIMINISHED_FIFTEENTH: IntervalDiatonicAlt;
    static PERFECT_FIFTEENTH: IntervalDiatonicAlt;
    static AUGMENTED_FOURTEENTH: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_FOURTEENTH: IntervalDiatonicAlt;
    static AUGMENTED_FIFTEENTH: IntervalDiatonicAlt;
    static DOUBLY_AUGMENTED_FIFTEENTH: IntervalDiatonicAlt;

    private _intervalChromatic: number = null;

    private static _cache = new IntervalDiatonicAltCache(
        (hashingObject: HashingObject) => new IntervalDiatonicAlt(hashingObject.interval, hashingObject.quality)
    );

    private constructor(private _intervalDiatonic, private _quality: Quality) {
    }

    static from(intervalDiatonic: IntervalDiatonic, quality: Quality): IntervalDiatonicAlt {
        return this._cache.getOrCreate({ interval: intervalDiatonic, quality: quality });
    }

    static between(diatonicAlt1: DiatonicAlt, diatonicAlt2: DiatonicAlt) {
        let intervalDiatonic: IntervalDiatonic = IntervalDiatonic.from(diatonicAlt2.diatonic.valueOf() - diatonicAlt1.diatonic.valueOf());

        let intervalChromatic = diatonicAlt2.chromatic.valueOf() - diatonicAlt1.chromatic.valueOf();
        intervalChromatic = rotativeTrim(intervalChromatic, Chromatic.NUMBER);

        return this.fromIntervals(intervalChromatic, intervalDiatonic);
    }

    static betweenChromatic(chromatic1: Chromatic, chromatic2: Chromatic) {
        let diatonicAlt1 = DiatonicAlt.fromChromatic(chromatic1);
        let diatonicAlt2 = DiatonicAlt.fromChromatic(chromatic2);

        return this.between(diatonicAlt1, diatonicAlt2);
    }

    withAdd(interval: IntervalDiatonicAlt): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.fromIntervals(this.intervalChromatic + interval.intervalChromatic, this.intervalDiatonic.withAdd(interval.intervalDiatonic));
    }

    withSub(interval: IntervalDiatonicAlt): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.fromIntervals(this.intervalChromatic - interval.intervalChromatic, this.intervalDiatonic.withSub(interval.intervalDiatonic));
    }

    static fromIntervals(intervalChromatic: number, intervalDiatonic: IntervalDiatonic): IntervalDiatonicAlt {
        let numInOctave: number = intervalDiatonic.valueOf() % Diatonic.NUMBER;

        let diff = intervalChromatic % Chromatic.NUMBER - SemisMajor[numInOctave];
        switch (numInOctave) {
            case IntervalDiatonic.UNISON.valueOf():
            case IntervalDiatonic.FOURTH.valueOf():
            case IntervalDiatonic.FIFTH.valueOf():
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
            case IntervalDiatonic.SECOND.valueOf():
            case IntervalDiatonic.THIRD.valueOf():
            case IntervalDiatonic.SIXTH.valueOf():
            case IntervalDiatonic.SEVENTH.valueOf():
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
        let rootIntervalDiatonicIntValue: number = this.intervalDiatonic.valueOf() % Diatonic.NUMBER;
        let octaves: number = Math.floor(this.intervalDiatonic.valueOf() / Diatonic.NUMBER);

        let rootIntervalChromatic = SemisMajor[rootIntervalDiatonicIntValue];
        switch (rootIntervalDiatonicIntValue) {
            case IntervalDiatonic.UNISON.valueOf():
            case IntervalDiatonic.FOURTH.valueOf():
            case IntervalDiatonic.FIFTH.valueOf():
                switch (this._quality) {
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
            case IntervalDiatonic.SECOND.valueOf():
            case IntervalDiatonic.THIRD.valueOf():
            case IntervalDiatonic.SIXTH.valueOf():
            case IntervalDiatonic.SEVENTH.valueOf():
                switch (this._quality) {
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

    get quality(): Quality {
        return this._quality;
    }

    get alts() {
        return this.intervalChromatic - Diatonic.fromInt(this.intervalDiatonic.valueOf()).chromatic.valueOf();
    }

    toString(): string {
        let ret = this._quality.shortName;

        ret += (this.intervalDiatonic.valueOf() + 1);

        return ret;
    }

    hashCode(): string {
        return "d:" + this.intervalDiatonic + "s:" + this.intervalChromatic;
    }
}