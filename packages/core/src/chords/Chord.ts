import type { Arrays } from "@datune/utils";

export interface Chord<P> {
    pitches: Arrays.NonEmpty<P>;
    root: P;
    has(pitch: P): boolean;
    hasAny(...pitches: Arrays.NonEmpty<P>): boolean;
    hasAll(...pitches: Arrays.NonEmpty<P>): boolean;
    length: number;
}
