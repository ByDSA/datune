import { mod, NonEmptyArray } from "@datune/utils";
import { Chromatic, SPN } from "../../../pitches";

export type ChromaticInterval = number;
export type ChromaticIntervalArray = NonEmptyArray<ChromaticInterval>;
export namespace ChromaticInterval {
    export function between(n1: Chromatic, n2: Chromatic): ChromaticInterval {
        return mod(n2.valueOf() - n1.valueOf(), Chromatic.NUMBER);
    }

    export function betweenSPN(n1: SPN, n2: SPN): ChromaticInterval {
        return n2.valueOf() - n1.valueOf();
    }

    export const PERFECT_UNISON = 0;
    export const MINOR_SECOND = 1;
    export const MAJOR_SECOND = 2;
    export const MINOR_THIRD = 3;
    export const MAJOR_THIRD = 4;
    export const PERFECT_FOURTH = 5;
    export const DIMINISHED_FIFTH = 6;
    export const TRITONE = DIMINISHED_FIFTH;
    export const PERFECT_FIFTH = 7;
    export const MINOR_SIXTH = 8;
    export const MAJOR_SIXTH = 9;
    export const MINOR_SEVENTH = 10;
    export const MAJOR_SEVENTH = 11;
}