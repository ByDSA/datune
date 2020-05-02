import { ImmutablesCache } from '../common/ImmutablesCache';

type HashingObject = number;
export class MusicalDuration {
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

    private static immutablesCache = new ImmutablesCache<MusicalDuration, HashingObject>(
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

    get value(): number {
        return this._value;
    }

    public getAdd(musicalDuration: MusicalDuration) {
        return MusicalDuration.from(this.value + musicalDuration.value);
    }

    public getSub(musicalDuration: MusicalDuration) {
        return MusicalDuration.from(this.value - musicalDuration.value);
    }

    public getMult(factor: number) {
        return MusicalDuration.from(this.value * factor);
    }

    public getDivCell(cellSize: MusicalDuration): number {
        return Math.floor(this.value / cellSize.value);
    }

    public getDiv(n: number) {
        return MusicalDuration.from(this.value / n);
    }

    public isBetween(a: MusicalDuration, b: MusicalDuration): boolean {
        return this.value >= a.value && this.value < b.value;
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