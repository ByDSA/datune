import { BPM } from './BPM';
import { Time } from './Time';
import { HashingObject, MusicalDurationCache } from './MusicalDurationCache';

export class MusicalDuration implements Time {
    static MAXIMA: MusicalDuration;
    static LONGA: MusicalDuration;
    static DOUBLE: MusicalDuration;
    static WHOLE: MusicalDuration;
    static HALF: MusicalDuration;
    static QUARTER: MusicalDuration;
    static EIGHTH: MusicalDuration;
    static SIXTEENTH: MusicalDuration;
    static THIRTYSECOND: MusicalDuration;
    static SIXTYFOURTH: MusicalDuration;

    static ZERO: MusicalDuration;

    private static _cache = new MusicalDurationCache(
        (hashingObject: HashingObject) => new MusicalDuration(hashingObject)
    );

    private _value: number;

    constructor(value: number) {
        this._value = value;
    }

    static from(value: number) {
        return MusicalDuration._cache.getOrCreate(value);
    }

    static fromMillisAndBPM(millis: number, bpm: BPM) {
        let millisBeat = bpm.getMillis(bpm.beat);
        let millisWhole = millisBeat / bpm.beat.value;
        let value = millis / millisWhole;

        return MusicalDuration.from(value);
    }

    get value(): number {
        return this._value;
    }

    withAdd(musicalDuration: MusicalDuration): MusicalDuration {
        return MusicalDuration.from(this.value + musicalDuration.value);
    }

    withSub(musicalDuration: MusicalDuration): MusicalDuration {
        return MusicalDuration.from(this.value - musicalDuration.value);
    }

    withMult(factor: number): MusicalDuration {
        return MusicalDuration.from(this.value * factor);
    }

    withDivCell(cellSize: MusicalDuration): number {
        return Math.floor(this.value / cellSize.value);
    }

    withDiv(n: number): MusicalDuration {
        return MusicalDuration.from(this.value / n);
    }

    valueOf(): number {
        return this.value;
    }

    clone(): MusicalDuration {
        return this;
    }

    get dotted() {
        return this.withMult(1.5);
    }

    get triplet() {
        return this.withDiv(1.5);
    }

    toString(): string {
        return (this.value / MusicalDuration.QUARTER.value).toString();
    }
}