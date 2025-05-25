import { NonEmptyArray } from "datils/datatypes";

export interface SymbolicChord<P, I> {
    has(pitch: P): boolean;
    hasAny(...pitches: NonEmptyArray<P>): boolean;
    hasAll(...pitches: NonEmptyArray<P>): boolean;
    withRoot(root: P): SymbolicChord<P, I>;
    withBass(bass: P): SymbolicChord<P, I>;
    withShift(interval: I): SymbolicChord<P, I>;
    withShiftDown(interval: I): SymbolicChord<P, I>;
    withInv(n?: number): SymbolicChord<P, I>;
    withAdd(...pitches: NonEmptyArray<P>): SymbolicChord<P, I>;
    withRemove(...pitches: NonEmptyArray<P>): SymbolicChord<P, I>;
    size: number;
    root: P;
    bass: P;
}
