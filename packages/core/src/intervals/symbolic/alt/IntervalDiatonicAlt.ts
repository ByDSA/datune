import { mod, NonEmptyArray } from '@datune/utils';
import { Chromatic, Diatonic, DiatonicAlt } from '../../../pitches';
import { Scale } from '../../../scales';
import { ChromaticInterval } from '../chromatic/ChromaticInterval';
import { IntervalDiatonic } from '../diatonic/IntervalDiatonic';
import { Quality } from '../quality/Quality';
import { HashingObject, IntervalDiatonicAltCache } from './building/cache/IntervalDiatonicAltCache';
import { IntervalAltStaticNames } from './building/staticnames/IntervalDiatonicAltStaticNames';
import { PrecalculateSemis } from './PrecalculateSemis';

export type IntervalDiatonicAltArray = NonEmptyArray<IntervalDiatonicAlt>;
export class IntervalDiatonicAlt extends IntervalAltStaticNames {
    private _interval: number | undefined;

    private static _cache = new IntervalDiatonicAltCache(
        (hashingObject: HashingObject) => new IntervalDiatonicAlt(hashingObject.interval, hashingObject.quality)
    );

    private constructor(private _intervalDiatonic: IntervalDiatonic, private _quality: Quality) {
        super();
    }

    static from(intervalDiatonic: IntervalDiatonic, quality: Quality): IntervalDiatonicAlt {
        return this._cache.getOrCreate({ interval: intervalDiatonic, quality: quality });
    }

    static between(noteAlt1: DiatonicAlt, noteAlt2: DiatonicAlt): IntervalDiatonicAlt {
        let intervalDiatonic: IntervalDiatonic = IntervalDiatonic.from(noteAlt2.diatonic.valueOf() - noteAlt1.diatonic.valueOf());

        let intervalNote = noteAlt2.note.valueOf() - noteAlt1.note.valueOf();
        intervalNote = mod(intervalNote, Chromatic.NUMBER);

        return this.fromIntervals(intervalNote, intervalDiatonic);
    }

    withAdd(intervalAlt: IntervalDiatonicAlt): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.fromIntervals(this.interval + intervalAlt.interval, this.intervalDiatonic.withAdd(intervalAlt.intervalDiatonic));
    }

    withSub(intervalAlt: IntervalDiatonicAlt): IntervalDiatonicAlt {
        let diffSemis = this.interval - intervalAlt.interval;
        if (diffSemis < 0)
            diffSemis = mod(diffSemis, Chromatic.NUMBER);
        return IntervalDiatonicAlt.fromIntervals(diffSemis, this.intervalDiatonic.withSub(intervalAlt.intervalDiatonic));
    }

    static fromIntervals(interval: ChromaticInterval, intervalDiatonic: IntervalDiatonic): IntervalDiatonicAlt {
        let intervalInOctave: IntervalDiatonic = IntervalDiatonic.from(intervalDiatonic.valueOf() % Diatonic.NUMBER);

        const SemisMajor = Scale.MAJOR.degrees;
        let diff = interval % Chromatic.NUMBER - SemisMajor[intervalInOctave.valueOf()];
        switch (intervalInOctave) {
            case IntervalDiatonic.UNISON:
            case IntervalDiatonic.FOURTH:
            case IntervalDiatonic.FIFTH:
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
            case IntervalDiatonic.SECOND:
            case IntervalDiatonic.THIRD:
            case IntervalDiatonic.SIXTH:
            case IntervalDiatonic.SEVENTH:
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

        throw new Error("Cannot get IntervalAlt from Interval=" + interval + ", IntervalDiatonic=" + intervalDiatonic);
    }

    static fromString(str: string): IntervalDiatonicAlt | null {
        let splited = this.splitLettersNumbers(str);
        if (!splited)
            return null;

        let intervalDiatonic = IntervalDiatonic.from(splited.n - 1);
        let quality = Quality.fromString(splited.str);
        if (!quality || !intervalDiatonic)
            return null;

        return this.from(intervalDiatonic, quality);
    }

    private static splitLettersNumbers(str: string): { str: string, n: number } | null {
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

    get interval(): number {
        if (!this._interval) {
            this._interval = <number>new PrecalculateSemis(this).calc();
            Object.freeze(this._interval);
        }

        return <number>this._interval;
    }

    get intervalDiatonic(): IntervalDiatonic {
        return this._intervalDiatonic;
    }

    get quality(): Quality {
        return this._quality;
    }

    get alts() {
        return this.interval - Diatonic.fromInt(this.intervalDiatonic.valueOf()).chromatic.valueOf();
    }

    toString(): string {
        return this._quality.shortName +
            (this.intervalDiatonic.valueOf() + 1);
    }

    hashCode(): string {
        return "d:" + this.intervalDiatonic + "s:" + this.interval;
    }
}