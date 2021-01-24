import { Arrays } from '@datune/utils';
import { NumberArray } from '@datune/utils/datastructures/arrays/Arrays';
import { RhythmArray } from './RhythmArray';

export class RhythmPattern implements Iterable<number> {
    public static QUARTER = RhythmPattern.from(4);
    public static THIRD = RhythmPattern.from(3);
    public static QUARTER_THIRD = RhythmPattern.from(4, 3);
    public static TRESILLO = RhythmPattern.from(3, 3, 2);
    public static CINQUILLO = RhythmPattern.from(2, 1, 2, 1, 2);
    public static RUMBA = RhythmPattern.from(2, 3, 2, 2, 3);

    private _array: RhythmArray | undefined;
    private _values: NumberArray;

    private constructor(...ints: NumberArray) {
        this._values = ints;

        Object.freeze(this._values);
    }

    [Symbol.iterator]() {
        return this._values[Symbol.iterator]();
    }

    static fromArray(...ints: RhythmArray): RhythmPattern {
        const values = _rhythmArray2Values(ints);
        let rhythm = new RhythmPattern(...values);
        rhythm._array = ints;
        Object.freeze(rhythm._array);
        Object.freeze(rhythm);

        return rhythm;
    }

    static from(...values: NumberArray): RhythmPattern {
        _checkPattern(values);
        let rhythm = new RhythmPattern(...values);

        return rhythm;
    }

    get values(): NumberArray {
        return this._values;
    }

    get array(): RhythmArray {
        if (!this._array) {
            this._array = this._calcArray();
            Object.freeze(this._array);
            Object.freeze(this);
        }
        return this._array;
    }

    private _calcArray(): RhythmArray {
        let newInts: number[] = [];
        for (let i of this.values)
            newInts = newInts.concat(1).concat(Array(i - 1).fill(0));
        return <RhythmArray>newInts;
    }

    withRotation(n: number): RhythmPattern {
        const values: NumberArray = <NumberArray>Array.from(this._values);
        Arrays.rotateRight(values, n);
        return new RhythmPattern(...values);
    }

    withReversed(): RhythmPattern {
        let eucledianString = <NumberArray>Array.from(this.values).reverse();

        return RhythmPattern.from(...eucledianString);
    }

    toString(): string {
        let stringBuilder = "";
        stringBuilder += "[";
        let first = true;
        for (let i of this.values) {
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

function _checkPattern(ints: NumberArray) {
    for (const i of ints)
        if (i < 1)
            throw new Error();
}

function _rhythmArray2Values(ints: RhythmArray): NumberArray {
    let ret: number[] = [];
    let current = 1;
    for (let i = 1; i < ints.length; i++) {
        if (ints[i] == 0)
            current++;
        else {
            ret.push(current);
            current = 1;
        }
    }

    ret.push(current);

    return <NumberArray>ret;
}