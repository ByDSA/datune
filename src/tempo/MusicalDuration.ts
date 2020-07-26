import { PrecalcCache } from '../common/PrecalcCache';
import { BPM } from './BPM';
import { Time } from './Time';

type HashingObject = number;
export class MusicalDuration implements Time {
    public static MAXIMA: MusicalDuration;
    public static LONGA: MusicalDuration;
    public static DOUBLE: MusicalDuration;
    public static WHOLE: MusicalDuration;
    public static HALF: MusicalDuration;
    public static QUARTER: MusicalDuration;
    public static EIGHTH: MusicalDuration;
    public static SIXTEENTH: MusicalDuration;
    public static THIRTYSECOND: MusicalDuration;
    public static SIXTYFOURTH: MusicalDuration;

    public static ZERO: MusicalDuration;

    private static immutablesCache = new PrecalcCache<MusicalDuration, HashingObject>(
        function (hashingObject: HashingObject): string {
            return hashingObject.toString();
        },
        function (musicalDuration: MusicalDuration): HashingObject {
            return musicalDuration.value;
        },
        function (hashingObject: HashingObject): MusicalDuration {
            return new MusicalDuration(hashingObject);
        }
    );

    private _value: number;

    constructor(value: number) {
        this._value = value;
    }

    public static from(value: number) {
        return MusicalDuration.immutablesCache.getOrCreate(value);
    }

    public static fromMillisAndBPM(millis: number, bpm: BPM) {
        let millisBeat = bpm.getMillis(bpm.beat);
        let millisWhole = millisBeat / bpm.beat.value;
        let value = millis / millisWhole;

        return MusicalDuration.from(value);
    }

    get value(): number {
        return this._value;
    }

    public getAdd(musicalDuration: MusicalDuration): MusicalDuration {
        return MusicalDuration.from(this.value + musicalDuration.value);
    }

    public getSub(musicalDuration: MusicalDuration): MusicalDuration {
        return MusicalDuration.from(this.value - musicalDuration.value);
    }

    public getMult(factor: number): MusicalDuration {
        return MusicalDuration.from(this.value * factor);
    }

    public getDivCell(cellSize: MusicalDuration): number {
        return Math.floor(this.value / cellSize.value);
    }

    public getDiv(n: number): MusicalDuration {
        return MusicalDuration.from(this.value / n);
    }

    public valueOf(): number {
        return this.value;
    }

    clone(): MusicalDuration {
        return this;
    }

    public get dotted() {
        return this.getMult(1.5);
    }

    public get triplet() {
        return this.getDiv(1.5);
    }

    public toString(): string {
        return (this.value / MusicalDuration.QUARTER.value).toString();
    }

    private static initialize() {
        this.MAXIMA = new MusicalDuration(8);
        this.LONGA = new MusicalDuration(4);
        this.DOUBLE = new MusicalDuration(2);
        this.WHOLE = new MusicalDuration(1);
        this.HALF = new MusicalDuration(1 / 2.0);
        this.QUARTER = new MusicalDuration(1 / 4.0);
        this.EIGHTH = new MusicalDuration(1 / 8.0);
        this.SIXTEENTH = new MusicalDuration(1 / 16.0);
        this.THIRTYSECOND = new MusicalDuration(1 / 32.0);
        this.SIXTYFOURTH = new MusicalDuration(1 / 64.0);

        this.ZERO = new MusicalDuration(0);
    }
}