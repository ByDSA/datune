import { NonEmptyArray } from "datils/datatypes";
import { IIntervalSet } from "sets/interval-sets/IIntervalSet";
import { IPitchSet } from "sets/pitch-sets/IPitchSet";

export interface SymbolicChord<P, I> extends Iterable<P> {
    // Queries
    has(pitch: P): boolean;
    hasAny(...pitches: NonEmptyArray<P>): boolean;
    hasAll(...pitches: NonEmptyArray<P>): boolean;
    hasRootIntervals(...rootIntervals: NonEmptyArray<I>): boolean;
    hasAnyRootIntervals(...rootIntervals: NonEmptyArray<I>): boolean;

    // Modifiers
    withRoot(root: P): SymbolicChord<P, I>;
    withBass(bass: P): SymbolicChord<P, I>;
    withShifted(interval: I): SymbolicChord<P, I>;
    withShiftedDown(interval: I): SymbolicChord<P, I>;
    withInv(n?: number): SymbolicChord<P, I>;
    withAdded(...pitches: NonEmptyArray<P>): SymbolicChord<P, I>;
    withRemoved(...pitches: NonEmptyArray<P>): SymbolicChord<P, I>;
    withRootIntervalsAdded(...rootIntervals: NonEmptyArray<I>): SymbolicChord<P, I>;
    withRootIntervalsRemoved(...rootIntervals: NonEmptyArray<I>): SymbolicChord<P, I>;
    withSus4(): SymbolicChord<P, I>;
    withSus2(): SymbolicChord<P, I>;

    // Properties
    pitchSet: IPitchSet<P, I>;
    pitches: Readonly<NonEmptyArray<P>>;
    size: number;
    root: P;
    bass: P;

    // Transform
    toIntervalSet: ()=> IIntervalSet<I>;
}
