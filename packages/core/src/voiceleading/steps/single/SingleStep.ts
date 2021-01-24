import { NonEmptyArray } from "@datune/utils";
import { ChromaticInterval } from "../../../intervals";
import { SPNOrNullArray, Step } from "../Step";
import { HashingObjectType, SingleStepCache } from "./SingleStepCache";

export type SingleStepArray = NonEmptyArray<SingleStep>;
export class SingleStep implements Step {
    private static _cache = new SingleStepCache((hashingObject: HashingObjectType) => {
        return new SingleStep(hashingObject.index, hashingObject.interval);
    });

    private constructor(private _index: number, private _interval: ChromaticInterval | null) {
        Object.freeze(this);
    }

    static from(index: number, interval: ChromaticInterval | null): SingleStep {
        return this._cache.getOrCreate({
            index, interval
        })
    }

    get index(): number {
        return this._index;
    }

    get interval(): number | null {
        return this._interval;
    }

    withIndex(newIndex: number): SingleStep {
        return SingleStep.from(newIndex, this._interval);
    }

    toString(): string {
        return `[${this.index}] => ${this.interval}`;
    }

    apply(notes: SPNOrNullArray): SPNOrNullArray {
        if (notes[this.index] === null)
            return notes;
        let ret: SPNOrNullArray = [...notes];
        ret[this.index] = this.interval !== null && notes[this.index]?.withShift(this.interval) || null;

        return ret;
    }
}

export namespace SingleStep {
    export const _0_1 = SingleStep.from(0, 1);
    export const _0_2 = SingleStep.from(0, 2);
    export const _0_S1 = SingleStep.from(0, -1);
    export const _0_S2 = SingleStep.from(0, -2);
    export const _1_1 = SingleStep.from(1, 1);
    export const _1_2 = SingleStep.from(1, 2);
    export const _1_S1 = SingleStep.from(1, -1);
    export const _1_S2 = SingleStep.from(1, -2);
    export const _2_1 = SingleStep.from(2, 1);
    export const _2_2 = SingleStep.from(2, 2);
    export const _2_S1 = SingleStep.from(2, -1);
    export const _2_S2 = SingleStep.from(2, -2);
}

export type SingleStepOrNull = SingleStep | null;