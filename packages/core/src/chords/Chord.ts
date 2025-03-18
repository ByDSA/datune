import { NonEmptyArray } from "datils/datatypes";

export interface Chord<P> {
    pitches: NonEmptyArray<P>;
    root: P;
    has(pitch: P): boolean;
    hasAny(...pitches: NonEmptyArray<P>): boolean;
    hasAll(...pitches: NonEmptyArray<P>): boolean;
    length: number;
}
