import { arrayRotateLeft, arrayRotateRight } from '@datune/utils/Utils';

export class RhythmPattern implements Iterable<number> {
    public static QUARTER = RhythmPattern.fromPattern(4);
    public static THIRD = RhythmPattern.fromPattern(3);
    public static QUARTER_THIRD = RhythmPattern.fromPattern(4, 3);
    public static TRESILLO = RhythmPattern.fromPattern(3, 3, 2);
    public static CINQUILLO = RhythmPattern.fromPattern(2, 1, 2, 1, 2);
    public static RUMBA = RhythmPattern.fromPattern(2, 3, 2, 2, 3);

    private _array: number[];

    private constructor() {
        this._array = [];
    }

    [Symbol.iterator]() {
        return this._array[Symbol.iterator]();
    }

    static fromArray(...ints: number[]): RhythmPattern {
        let rhythm = new RhythmPattern();
        for (let i of ints)
            rhythm._array.push(i == 0 ? 0 : 1);

        rhythm.checkFirstOne();
        rhythm.makeArrayImmutable();

        return rhythm;
    }

    static fromPattern(...ints: number[]): RhythmPattern {
        let rhythm = new RhythmPattern();
        for (let i of ints)
            for (let j = 0; j < i; j++)
                if (j == 0)
                    rhythm._array.push(1);
                else
                    rhythm._array.push(0);

        rhythm.checkFirstOne();
        rhythm.makeArrayImmutable();

        return rhythm;
    }

    get array(): number[] {
        return Array.from(this._array);
    }

    private makeArrayImmutable(): void {
        this._array = Array.from(this._array);
    }

    public get length(): number {
        return this._array.length;
    }

    public getRotation(n: number): RhythmPattern {
        let rhythm = new RhythmPattern();
        rhythm._array = Array.from(this._array);
        for (let i = 0; i < n; i++)
            for (let j = 0; j < this.length; j++) {
                rhythm._array = arrayRotateRight(rhythm._array)

                if (this._array[0] == 1)
                    break;
            }

        rhythm.makeArrayImmutable();
        rhythm.checkFirstOne();

        return rhythm;
    }

    private checkFirstOne(): void {
        if (this._array[0] != 1)
            throw new Error("First array index is not 1, but have to be");
    }

    get pattern(): number[] {
        let ret: number[] = [];
        let current = 1;
        for (let i = 1; i < this.length; i++) {
            if (this._array[i] == 0)
                current++;
            else {
                ret.push(current);
                current = 1;
            }
        }

        ret.push(current);

        return ret;
    }

    getReversed(): RhythmPattern {
        let eucledianString = this.pattern.reverse();

        return RhythmPattern.fromPattern(...eucledianString);
    }

    toString(): string {
        let stringBuilder = "";
        stringBuilder += "[";
        let first = true;
        for (let i of this.pattern) {
            if (first)
                first = false;
            else
                stringBuilder += ", ";
            stringBuilder += i;
        }

        stringBuilder += "]";

        return stringBuilder.toString();
    }
}